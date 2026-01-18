/**
 * Format sport name to display properly
 * - Removes redundant suffixes (e.g., "Ahl", "Nba", etc.)
 * - Changes "Icehockey" to "Hockey"
 */
export const formatSportName = (sportName: string): string => {
    if (!sportName) return '';
    
    // Split by space and take only the first word
    const firstWord = sportName.split(' ')[0];
    
    // Replace "Icehockey" with "Hockey"
    if (firstWord.toLowerCase() === 'icehockey') {
        return 'Hockey';
    }
    
    // Capitalize first letter and return
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();
};

/**
 * Format ISO timestamp to readable EST time
 * Input: "2025-12-22T00:11:00Z"
 * Output: "Dec 21, 7:11 PM EST"
 */
export const formatTimeToEST = (isoString: string): string => {
    if (!isoString) return '';
    
    try {
        const date = new Date(isoString);
        
        // Format to EST timezone
        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'America/New_York',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        };
        
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const formatted = formatter.format(date);
        
        return `${formatted} EST`;
    } catch (error) {
        console.error('Error formatting time:', error);
        return isoString;
    }
};
