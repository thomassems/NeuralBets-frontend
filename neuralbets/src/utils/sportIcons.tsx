import React from 'react';

const icons: Record<string, (className?: string) => React.ReactNode> = {
    hockey: (cls = 'w-5 h-5') => (
        <svg className={cls} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M17 9c0 3.87-3.13 7-7 7m7-7c0-3.87-3.13-7-7-7m7 7h4M3 9h4m3-7c-3.87 0-7 3.13-7 7s3.13 7 7 7' />
            <line x1='2' y1='18' x2='22' y2='18' />
            <line x1='7' y1='21' x2='7' y2='18' />
            <line x1='17' y1='21' x2='17' y2='18' />
        </svg>
    ),
    soccer: (cls = 'w-5 h-5') => (
        <svg className={cls} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <circle cx='12' cy='12' r='10' />
            <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
            <path d='M2 12h20' />
        </svg>
    ),
    basketball: (cls = 'w-5 h-5') => (
        <svg className={cls} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <circle cx='12' cy='12' r='10' />
            <path d='M4.93 4.93c4.08 2.38 8.06 2.38 12.14 0' />
            <path d='M4.93 19.07c4.08-2.38 8.06-2.38 12.14 0' />
            <path d='M12 2v20' />
            <path d='M2 12h20' />
        </svg>
    ),
    football: (cls = 'w-5 h-5') => (
        <svg className={cls} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <ellipse cx='12' cy='12' rx='10' ry='6' />
            <path d='M12 6v12' />
            <path d='M9 8l6 0' />
            <path d='M9 10l6 0' />
            <path d='M9 14l6 0' />
            <path d='M9 16l6 0' />
        </svg>
    ),
    baseball: (cls = 'w-5 h-5') => (
        <svg className={cls} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <circle cx='12' cy='12' r='10' />
            <path d='M6.7 6.7c2.8 2.3 2.8 8.3 0 10.6' />
            <path d='M17.3 6.7c-2.8 2.3-2.8 8.3 0 10.6' />
        </svg>
    ),
    tennis: (cls = 'w-5 h-5') => (
        <svg className={cls} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <circle cx='12' cy='12' r='10' />
            <path d='M18.36 5.64a9 9 0 0 1-2.52 6.72 9 9 0 0 1-6.72 2.52' />
            <path d='M5.64 18.36a9 9 0 0 1 2.52-6.72 9 9 0 0 1 6.72-2.52' />
        </svg>
    ),
    mma: (cls = 'w-5 h-5') => (
        <svg className={cls} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2' />
            <path d='M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2' />
            <path d='M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8' />
            <path d='M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15' />
        </svg>
    ),
    cricket: (cls = 'w-5 h-5') => (
        <svg className={cls} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <circle cx='12' cy='6' r='4' />
            <path d='M8 22l4-16 4 16' />
        </svg>
    ),
    rugby: (cls = 'w-5 h-5') => (
        <svg className={cls} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <ellipse cx='12' cy='12' rx='7' ry='10' transform='rotate(45 12 12)' />
            <path d='M7.5 7.5l9 9' />
            <path d='M9 6l0 3-3 0' />
            <path d='M15 18l0-3 3 0' />
        </svg>
    ),
};

export function getSportIcon(sportName: string, className?: string): React.ReactNode {
    const key = sportName.toLowerCase();
    const renderer = icons[key];
    if (renderer) return renderer(className);
    // Fallback: generic circle
    return (
        <svg className={className || 'w-5 h-5'} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <circle cx='12' cy='12' r='10' />
            <path d='M12 8v4l2 2' />
        </svg>
    );
}

const FAVORITES_KEY = 'neuralbets_favorite_sports';

export function getFavoriteSports(): string[] {
    try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function toggleFavoriteSport(sport: string): string[] {
    const current = getFavoriteSports();
    const index = current.indexOf(sport);
    if (index >= 0) {
        current.splice(index, 1);
    } else {
        current.push(sport);
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(current));
    return [...current];
}
