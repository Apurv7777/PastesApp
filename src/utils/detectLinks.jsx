export function detectLinks(text) {
    const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
    return text.replace(urlPattern, (url) => {
        const href = url.startsWith('www.') ? `http://${url}` : url;
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium transition-colors duration-200 break-all">${url}</a>`;
    });
}
