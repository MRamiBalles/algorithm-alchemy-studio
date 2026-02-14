import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Mathematical styling

interface TheoryViewerProps {
    content: string;
}

export function TheoryViewer({ content }: TheoryViewerProps) {
    return (
        <div className="prose prose-invert prose-headings:text-cyan-400 prose-a:text-pink-400 prose-code:text-orange-400 max-w-none p-6">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    // Custom components map if needed
                    table: ({ node, ...props }) => <div className="overflow-x-auto"><table {...props} className="table-auto border-collapse border border-slate-700 w-full" /></div>,
                    th: ({ node, ...props }) => <th {...props} className="border border-slate-700 px-4 py-2 bg-slate-900 text-left" />,
                    td: ({ node, ...props }) => <td {...props} className="border border-slate-700 px-4 py-2" />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
