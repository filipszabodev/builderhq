import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 sm:py-24">
      <section className="max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-ember">
          Clash of Clans community
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl">
          Builder<span className="text-ember">HQ</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          Where Clash builders gather. Browse bases, copy layouts, leave
          feedback, and share your own creations.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/bases"
            className="rounded-md bg-ember px-5 py-3 text-sm font-semibold text-background transition hover:bg-ember-soft"
          >
            Browse bases
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition hover:border-ember/50"
          >
            Join the community
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Copy bases",
            body: "Open a layout and copy it into Clash with the official link.",
          },
          {
            title: "Share yours",
            body: "Log in, upload a screenshot, and publish your base for others.",
          },
          {
            title: "Give feedback",
            body: "Like, dislike, and comment so good builders earn trust.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-border bg-surface/60 p-5"
          >
            <h2 className="font-display text-lg font-semibold text-foreground">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-dashed border-border bg-surface/30 px-5 py-8 text-center">
        <p className="text-sm text-muted">
          Milestone 0 shell is live. Auth, uploads, and community features come
          next.
        </p>
      </section>
    </div>
  );
}
