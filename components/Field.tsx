"use client";

type Props = {
  id: string;
  label: string;
  error?: string;
  help?: string;
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
    className: string;
  }) => React.ReactNode;
};

export default function Field({ id, label, error, help, children }: Props) {
  const describedBy = error ? `${id}-error` : help ? `${id}-help` : undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-display text-sm text-tissue">
        {label}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
        className: `w-full rounded-[10px] border bg-abyss/70 px-4 py-3 text-tissue placeholder:text-tissue-dim/50 transition-colors duration-200 focus:outline-none focus-visible:border-venom ${
          error ? "border-venom/70" : "border-biolum/20 hover:border-biolum/40"
        }`,
      })}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-venom">
          {error}
        </p>
      ) : help ? (
        <p id={`${id}-help`} className="text-sm text-tissue-dim">
          {help}
        </p>
      ) : null}
    </div>
  );
}
