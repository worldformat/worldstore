<script lang="ts">
  import HeroiconsChevronDown16Solid from '~icons/heroicons/chevron-down-16-solid';

  export type Tab = {
    label: string;
    href: string;
    current?: boolean;
  };

  type Props = {
    tabs: Tab[];
    class?: string;
  }

  let { tabs, class: klass = "" }: Props = $props();
</script>

<div class={klass}>
  <!-- Mobile (select) -->
  <div class="grid grid-cols-1 sm:hidden">
    <select aria-label="Select a tab" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 dark:bg-white/5 dark:text-gray-100 dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-primary-500">
      {#each tabs as tab}
        <option selected={tab.current}>{tab.label}</option>
      {/each}
    </select>
    <HeroiconsChevronDown16Solid aria-hidden="true" class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 dark:fill-gray-400" />
  </div>

  <!-- Desktop (tabs) -->
  <div class="hidden sm:flex justify-end">
    <nav aria-label="Tabs" class="isolate inline-flex divide-x divide-gray-200 rounded-lg bg-white shadow-sm dark:divide-white/10 dark:bg-gray-800/50 dark:shadow-none dark:outline dark:-outline-offset-1 dark:outline-white/10">
      {#each tabs as tab, i}
        <a
          href={tab.href}
          class="group relative min-w-0 overflow-hidden rounded-l-lg px-4 py-1.5 text-center text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:z-10 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
          class:rounded-l-lg={i === 0}
          class:rounded-r-lg={i === tabs.length - 1}
          aria-current={tab.current ? "page" : undefined}
        >
          <span>{tab.label}</span>
          {#if tab.current}
            <span aria-hidden="true" class="absolute inset-x-0 bottom-0 h-0.5 bg-primary-500 dark:bg-primary-500"></span>
          {:else}
            <span aria-hidden="true" class="absolute inset-x-0 bottom-0 h-0.5 bg-transparent"></span>
          {/if}
        </a>
      {/each}
    </nav>
  </div>
</div>
