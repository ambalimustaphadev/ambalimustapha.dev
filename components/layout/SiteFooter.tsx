import { SiteLogo } from "@/components/ui/SiteLogo";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { SITE_NAME } from "@/lib/constants";

/** Demo 17 footer (Footer4): centred logo and copyright, plus social links. */
export function SiteFooter() {
  return (
    <footer className="tmp-footer-area footer-style-4 tmp-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="footer-area text-center">
              <div className="logo">
                <SiteLogo />
              </div>
              <p className="description mt--30">
                © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
              </p>
              <SocialIcons className="social-link ambali-footer-social" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
