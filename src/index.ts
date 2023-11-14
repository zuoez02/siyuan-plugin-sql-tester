import { Plugin, Protyle } from "siyuan";
import { SqlTesterBlock } from './component';
import { CustomBlockManager } from 'siyuan-package-custom-block';

export default class SqlTesterPlugin extends Plugin {

    async onload() {
        CustomBlockManager.init(this);
        CustomBlockManager.load(SqlTesterBlock);
        this.protyleSlash = [{
            filter: ["sql", "插入SQL测试器", "crsqlcsq"],
            html: `<div class="b3-list-item__first"><span class="b3-list-item__text">${this.i18n.insertSqlTester}</span></div>`,
            id: "insertSqlTester",
            callback(protyle: Protyle) {
                const content = CustomBlockManager.buildBlock("SqlTesterBlock", {});
                protyle.insert(content);
            }
        }];
    }
}
