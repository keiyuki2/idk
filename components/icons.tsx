
import React from 'react';

export const UploadIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
);

export const SparklesIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${className} animate-pulse`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

export const SettingsIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.43.992a6.759 6.759 0 0 1 0 1.905c-.008.379.137.752.43.992l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.6 6.6 0 0 1-.22.128c-.332.183-.582.495-.644.869l-.213 1.28c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.759 6.759 0 0 1 0-1.905c.008-.379-.137-.752-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const KeyIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
    </svg>
);

export const LanguageIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3.27 18.75M15.75 10.5a48.47 48.47 0 0 1-4.548 3.075" />
    </svg>
);

export const CpuChipIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 1A2.25 2.25 0 0 0 1.5 3.25v13.5A2.25 2.25 0 0 0 3.75 19h13.5A2.25 2.25 0 0 0 19.5 16.75V3.25A2.25 2.25 0 0 0 17.25 1H3.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0-.75.75v4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h.008v.008H3.75V6.75zm.75 0h.008v.008H4.5V6.75zm0 3h.008v.008H4.5v-.008zm0 3h.008v.008H4.5v-.008zm-1.5 3h.008v.008H3v-.008zm0-3h.008v.008H3v-.008zm.75-6h.008v.008h-.008V6.75zm13.5-3h.008v.008h-.008V3.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 6.75h.008v.008h-.008V6.75zm-3 0h.008v.008h-.008V6.75zm-3 0h.008v.008h-.008V6.75zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm3-3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm3-3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm-1.5-6h.008v.008h-.008V6.75zm0 3h.008v.008h-.008v-.008zm-1.5-3h.008v.008h-.008V6.75zm0 3h.008v.008h-.008v-.008zm-3-3h.008v.008h-.008V6.75z" />
    </svg>
);

export const BookmarkIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
    </svg>
);

export const BoldIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M4.25 3A.75.75 0 0 0 3.5 3.75v12.5c0 .414.336.75.75.75h6.5a4.75 4.75 0 0 0 0-9.5h-4.5V6.75A.75.75 0 0 0 5 6h3.75a.75.75 0 0 0 0-1.5H4.25Z" />
    </svg>
);

export const ItalicIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M7.75 3A.75.75 0 0 0 7 3.75v1.5a.75.75 0 0 0 1.5 0V6h3.25a.75.75 0 0 0 0-1.5H9.81l1.9-4.22A.75.75 0 0 0 11.022.25L8.772.25a.75.75 0 0 0-.671.43L5.603 7.5H4.25a.75.75 0 0 0 0 1.5h1.93l-2.5 5.56A.75.75 0 0 0 4.372 16h2.25a.75.75 0 0 0 .671-.43L9.79 8.25h1.46a.75.75 0 0 0 0-1.5H8.81l1.9-4.22A.75.75 0 0 0 10.022.5h2.25a.75.75 0 0 0 .671.43L15.44 6.25h1.31a.75.75 0 0 0 0-1.5h-1.93l2.5-5.56A.75.75 0 0 0 16.628 0h-2.25a.75.75 0 0 0-.671.43L11.21 7.75H9.75a.75.75 0 0 0 0 1.5h1.93l-2.5 5.56A.75.75 0 0 0 9.872 16h2.25a.75.75 0 0 0 .671-.43l2.5-5.56h1.31a.75.75 0 0 0 0-1.5h-1.93l2.5-5.56A.75.75 0 0 0 16.628 1.5h2.25a.75.75 0 0 0 .671.43L13.19 14.75h1.56a.75.75 0 0 0 0-1.5h-1.43l1.9-4.22a.75.75 0 0 0-.68-1.07Z" />
    </svg>
);

export const ArrowsPointingOutIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m4.5 4.5h-4.5m4.5 0v4.5m0-4.5L15 15" />
    </svg>
);

export const PlayCircleIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
    </svg>
);

export const StopCircleIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.253 9.253 9 9.563 9h4.874c.31 0 .563.253.563.563v4.874c0 .31-.253.563-.563.563H9.563A.562.562 0 0 1 9 14.437V9.564Z" />
    </svg>
);

export const XMarkIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

export const TrashIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75V4.5h8V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4.5a.75.75 0 0 1 .75.75V15.5a.75.75 0 0 1-1.5 0V5.25A.75.75 0 0 1 10 4.5ZM4.5 4.5a.75.75 0 0 0-1.5 0v10.5a.75.75 0 0 0 1.5 0V4.5ZM15.5 4.5a.75.75 0 0 0-1.5 0v10.5a.75.75 0 0 0 1.5 0V4.5Z" clipRule="evenodd" />
    </svg>
);

export const ChevronDownIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
);

export const DocumentTextIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);

export const ChatBubbleLeftRightIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a1.125 1.125 0 0 1-1.59 0l-3.72-3.72A1.125 1.125 0 0 1 9 17.25v-4.286c0-.97.616-1.813 1.5-2.097m6.75-6.195a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v4.286c0 .97.616 1.813 1.5 2.097m11.25 0-3.72 3.72A1.125 1.125 0 0 1 12 10.5h-1.5a2.25 2.25 0 0 0-2.25 2.25v.008c0 .97.616 1.813 1.5 2.097m-2.25-4.25h.008v.008H9.75v-.008Z" />
    </svg>
);

export const ClockIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const PinIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M12.5 2.75a.75.75 0 0 0-2.22-.53l-2.73.91a.75.75 0 0 0-.53 1.28l1.36 1.36-1.5 1.5-3.3-3.3a.75.75 0 0 0-1.06 1.06l3.3 3.3-1.5 1.5-1.36-1.36a.75.75 0 0 0-1.28.53l-.91 2.73a.75.75 0 0 0 .53 2.22l2.73-.91a.75.75 0 0 0 .53-1.28L6.44 11l1.5-1.5 3.3 3.3a.75.75 0 0 0 1.06-1.06l-3.3-3.3 1.5-1.5 1.36 1.36a.75.75 0 0 0 1.28-.53l.91-2.73a.75.75 0 0 0-.53-2.22Z" clipRule="evenodd" />
    </svg>
);