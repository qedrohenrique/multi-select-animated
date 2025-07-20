# Create Expandable Timeline

## Download

```bash
npx @qedrohenrique/create-expandable-timeline
```

## Example

```typescript
const items = [
  {
    id: 1,
    date: "15 minutes ago",
    title: "Forked Repository",
    description:
      "Forked the repository to create a new branch for development.",
    icon: GitFork,
    defaultOpen: true,
  },
  {
    id: 2,
    date: "10 minutes ago",
    title: "Pull Request Submitted",
    description:
      "Submitted PR #342 with new feature implementation. Waiting for code review from team leads.",
    icon: GitPullRequest,
    defaultOpen: false,
  },
  {
    id: 3,
    date: "5 minutes ago",
    title: "Comparing Branches",
    description:
      "Received comments on PR. Minor adjustments needed in error handling and documentation.",
    icon: GitCompare,
    defaultOpen: false,
  },
  {
    id: 4,
    title: "Merged Branch",
    description:
      "Merged the feature branch into the main branch. Ready for deployment.",
    icon: GitMerge,
    defaultOpen: false,
  },
];

  const TimelineDemo = () => {
    return (
      <Timeline defaultValue={3}>
        {items.map((item) => (
          <TimelineItem
            key={item.id}
            step={item.id}
            className="group-data-[orientation=vertical]/timeline:ms-10 max-w-xs"
            defaultOpen={item.defaultOpen}
          >
            <TimelineHeader>
              <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
              <TimelineTitle className="mt-0.5">
                {item.title}
                <TimelineDate className="text-xs">{item.date}</TimelineDate>
              </TimelineTitle>
              <TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
                <item.icon size={14} />
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent>
              {item.description}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    );
  };
```


Isso copiará os arquivos de template e instalará as dependências necessárias.
