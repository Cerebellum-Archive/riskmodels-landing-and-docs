import type { MDXComponents } from "mdx/types";
// Contoh import komponen shadcn jika diperlukan
// import { Alert, Button } from "@/components/ui";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: (props) => (
      <div className="prose prose-neutral max-w-none space-y-8">
        {props.children}
      </div>
    ),
    h1: (props) => (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 mt-0 leading-tight text-primary">
        {props.children}
      </h1>
    ),
    h2: (props) => (
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-bold tracking-tight mt-12 mb-4 text-primary/90">
        {props.children}
      </h2>
    ),
    h3: (props) => (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-3 text-primary/80">
        {props.children}
      </h3>
    ),
    h4: (props) => (
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-2 text-primary/70">
        {props.children}
      </h4>
    ),
    p: (props) => (
      <p className="leading-8 text-base text-muted-foreground">
        {props.children}
      </p>
    ),
    ul: (props) => (
      <ul className="list-disc pl-6 space-y-2 text-base text-muted-foreground">
        {props.children}
      </ul>
    ),
    ol: (props) => (
      <ol className="list-decimal pl-6 space-y-2 text-base text-muted-foreground">
        {props.children}
      </ol>
    ),
    li: (props) => <li className="ml-2">{props.children}</li>,
    blockquote: (props) => (
      <blockquote className="border-l-4 border-primary/30 bg-muted px-6 py-4 italic rounded-md text-muted-foreground">
        {props.children}
      </blockquote>
    ),
    code: (props) => (
      <code className="rounded bg-muted px-1.5 py-1 font-mono text-sm text-primary">
        {props.children}
      </code>
    ),
    pre: (props) => (
      <pre className="rounded-lg bg-black/90 text-white p-4 overflow-x-auto my-6">
        {props.children}
      </pre>
    ),
    hr: () => <hr className="my-12 border-t border-muted" />,
    table: (props) => (
      <div className="overflow-x-auto my-8 rounded-lg border border-muted shadow-sm">
        <table className="min-w-full bg-background text-sm text-left">
          {props.children}
        </table>
      </div>
    ),
    thead: (props) => (
      <thead className="bg-muted/60 text-primary font-semibold">
        {props.children}
      </thead>
    ),
    tbody: (props) => <tbody>{props.children}</tbody>,
    tr: (props) => (
      <tr className="even:bg-muted/30 border-b last:border-0">{props.children}</tr>
    ),
    th: (props) => (
      <th className="py-3 px-4 border-b border-muted font-semibold">{props.children}</th>
    ),
    td: (props) => (
      <td className="py-3 px-4 border-b border-muted align-top">{props.children}</td>
    ),
    // Contoh mapping markdown ke komponen shadcn
    // alert: (props) => <Alert {...props} />,
    // button: (props) => <Button {...props} />,
    ...components,
  };
}
