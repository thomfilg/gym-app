/**
 * Comprehensive HTML entity decoder
 * Handles both named entities (&nbsp;, &amp;, etc.) and numeric entities (&#39;, &#x27;, etc.)
 */
const HTML_ENTITIES: Record<string, string> = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': '\'',
  '&#039;': '\'',
  '&#x27;': '\'',
  '&#39;': '\'',
  '&ldquo;': '"',
  '&rdquo;': '"',
  '&lsquo;': '\'',
  '&rsquo;': '\'',
  '&mdash;': '—',
  '&ndash;': '–',
  '&hellip;': '…',
  '&bull;': '•',
  '&copy;': '©',
  '&reg;': '®',
  '&trade;': '™',
};

function decodeHTMLEntities(text: string): string {
  // Replace named entities
  Object.entries(HTML_ENTITIES).forEach(([entity, char]) => {
    text = text.replace(new RegExp(entity, 'g'), char);
  });

  // Replace numeric entities (&#123; or &#xAB;)
  text = text.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number.parseInt(code, 10)));
  text = text.replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(Number.parseInt(code, 16)));

  return text;
}

/**
 * Strips HTML tags and decodes HTML entities from text
 * More efficient and comprehensive than manual regex replacements
 *
 * @param html - HTML string to clean
 * @param options - Configuration options
 * @returns Plain text with HTML removed and entities decoded
 */
export function stripHTML(
  html: string | null | undefined,
  options?: {
    maxLength?: number;
    preserveLineBreaks?: boolean;
    fallback?: string;
  },
): string {
  if (!html) {
    return options?.fallback ?? '';
  }

  let text = html;

  // Remove <style> tags and their contents
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // Remove <script> tags and their contents
  text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

  // Remove HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, '');

  // Optionally preserve line breaks before stripping tags
  if (options?.preserveLineBreaks) {
    text = text.replace(/<br\s*\/?>/gi, '\n');
    text = text.replace(/<\/p>/gi, '\n\n');
    text = text.replace(/<\/div>/gi, '\n');
  }

  // Strip all HTML tags
  text = text.replace(/<[^>]*>/g, '');

  // Decode HTML entities
  text = decodeHTMLEntities(text);

  // Clean up whitespace
  if (options?.preserveLineBreaks) {
    // Preserve line breaks but clean up excessive spacing
    text = text
      .replace(/[ \t]+/g, ' ')        // Multiple spaces/tabs to single space
      .replace(/\n\s*\n\s*\n/g, '\n\n') // Max 2 consecutive line breaks
      .trim();
  } else {
    // Replace all whitespace (including line breaks) with single spaces
    text = text
      .replace(/[\r\n\t]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Truncate if needed
  if (options?.maxLength && text.length > options.maxLength) {
    text = `${text.substring(0, options.maxLength)}...`;
  }

  // Return fallback if text is empty after cleaning
  return text || options?.fallback || '';
}
