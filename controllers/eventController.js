import supabase from '../supabase/client.js';
import mainScrapping from '../scrappers/mainScrapping.js';

export const scrapeEvents = async (events) => {
    try {
        const resolvedEvents = await Promise.resolve(events);
        
        if (!resolvedEvents || resolvedEvents.length === 0) {
            console.log('No events received to process');
            return { success: false, message: 'No events to process' };
        }

        const savedEvents = [];
        for (let i = 0; i < resolvedEvents.length; i++) {
            try {
                const event = resolvedEvents[i];
                
                const { data: existingEvent, error: existingError } = await supabase
                    .from('Event')
                    .select('id')
                    .eq('title', event.title)
                    .eq('hostedBy', event.hostedBy)
                    .limit(1);

                if (existingEvent && existingEvent.length > 0) {
                    continue;
                }

                const { data, error } = await supabase
                    .from('Event')
                    .insert([event])
                    .select();
                    
                if (error) {
                    console.error('Error saving event:', event.title, error.message);
                } else {
                    savedEvents.push(data[0]);
                }
            } catch (saveError) {
                console.error('Exception saving event:', event?.title, saveError.message);
            }
        }
        
        return { 
            success: true, 
            scraped: resolvedEvents.length, 
            saved: savedEvents.length,
            events: savedEvents 
        };

    } catch (error) {
        console.error('Error in scrapeEvents:', error);
        return { success: false, error: error.message };
    }
};

export const deleteExpireEvents = async () => {
    try {
        const today = new Date().toISOString().split('T')[0];

        const { data: deletedData, error: deleteError } = await supabase
            .from('Event')
            .delete({ count: 'exact' })
            .lt('deadline', today)
            .select();

        if (deleteError) {
            console.error('❌ Error deleting expired events:', deleteError.message);
            return { success: false, error: deleteError.message };
        }


    } catch (error) {
        console.error('Exception in deleteExpireEvents:', error.message);
    }
}


export const getEvents = async (req, res) => {
    const { data, error } = await supabase.from('Event').select('*').order('deadline', { ascending: true });

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
}

export const addEvents = async (req, res) => {
    // Map the incoming data to match your table structure
    const newEvent = {
        title: req.body.title,
        type: req.body.type,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        deadline: req.body.deadline,
        tags: req.body.tags || [],
        hostedBy: req.body.hosted_by || req.body.hostedBy,
        verified: req.body.verified === 'TRUE' || req.body.verified === true,
        redirectURL: req.body.redirectURL
    };

    try {
        const { data, error } = await supabase
            .from('Event')
            .insert([newEvent])
            .select();

        if (error) {
            return res.status(400).json({ error: error.message || 'Database error' });
        }
        return res.status(201).json(data);
    } catch (err) {
        return res.status(500).json({ error: 'Server error: ' + err.message });
    }
}

// Add this function to eventController.js
export const triggerScraping = async (req, res) => {
    try {
        console.log('🔄 Starting manual scraping...');
        
        // Scrape events from all platforms
        const scrapedEvents = await mainScrapping.scrapeHackathons();
        
        if (!scrapedEvents || scrapedEvents.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No events found from scraping',
                scraped: 0,
                saved: 0
            });
        }

        // Save scraped events to database
        const result = await scrapeEvents(scrapedEvents);
        
        return res.status(200).json({
            success: true,
            message: `Scraping completed. Scraped ${result.scraped} events, saved ${result.saved} new events`,
            scraped: result.scraped,
            saved: result.saved
        });

    } catch (error) {
        console.error('❌ Error in triggerScraping:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};