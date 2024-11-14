export function detectLinks(text) {
    const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
    return text.replace(urlPattern, (url) => {
        const href = url.startsWith('www.') ? `http://${url}` : url;
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;">${url}</a>`;
    });
}
