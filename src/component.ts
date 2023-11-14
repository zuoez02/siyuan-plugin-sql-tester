import { CustomBlock } from 'siyuan-package-custom-block';
import SqlTesterComponent from './sql-tester.svelte';
import CSS from './index.scss?inline';

export class SqlTesterBlock extends CustomBlock {
  static type = "SqlTesterBlock";
  static css = CSS;

  onMount(el: HTMLElement) {
    let style = '';
    const sheets = document.querySelectorAll('link[rel="stylesheet"]');
    for (const sheet of sheets) {
        const href = sheet.getAttribute('href');
        if (href.startsWith('base.') && href.endsWith('.css')) {
            style = href;
        }
    }
    new SqlTesterComponent({
        target: el,
        props: {
            style,
        }
    })
  }
}