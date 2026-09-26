import OPDIntegrations from "./Pages/Integrations";
import OPDSettings from "./Pages/Settings";

class OP3Dashboard {
    constructor() {
        this.integrations = new OPDIntegrations();
        this.settings = new OPDSettings();

        // All links leading to docs.optimizepress.com are opened in a new tab
        jQuery(function($) {
            let domains = [
                    'docs.optimizepress.com',
                    'my.optimizepress.com',
                    'www.optimizelink.com',
                ],
                selector = domains.map(domain => `a[href*="//${domain}"]`).join(',');

            $(selector).attr('target', '_blank');
        });
    }
}

export default OP3Dashboard;
