import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldAlert, Download, Printer } from "lucide-react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Cosset Logistics - Privacy Policy</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
              hr { border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0; }
              a { color: #2563eb; text-decoration: none; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { border: 1px solid #cbd5e1; padding: 12px; text-align: left; }
              th { background-color: #f1f5f9; }
              h1, h2, h3 { color: #0f172a; }
              ul { padding-left: 20px; }
            </style>
          </head>
          <body>
            ${policyHTMLContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
          />

          {/* Center modal panel */}
          <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[32px] shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden text-left flex flex-col h-[85vh] max-h-[850px]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-royal-blue/10 dark:bg-royal-blue/20 flex items-center justify-center text-royal-blue">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-950 dark:text-white uppercase tracking-tight">
                      Privacy & Data Protection Notice
                    </h3>
                    <p className="text-[10px] text-slate-450 dark:text-slate-400 font-medium">
                      Cosset Logistics Canada &bull; Winnipeg Headquarters
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="p-2 text-slate-450 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
                    title="Print Document"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 text-slate-450 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Document Container */}
              <div className="flex-1 overflow-y-auto bg-slate-100/50 dark:bg-slate-950 p-6 sm:p-10 flex justify-center">
                <div className="w-full max-w-3xl bg-white text-slate-800 p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200/60 font-sans leading-relaxed text-sm overflow-hidden prose prose-slate">
                  {/* Embedded styles to match the Termly output verbatim but nicely */}
                  <div 
                    className="privacy-policy-body"
                    dangerouslySetInnerHTML={{ __html: policyHTMLContent }} 
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-slate-450 dark:text-slate-450 font-medium font-mono uppercase tracking-wider">
                <span>Active Protection &bull; Winnipeg Regulatory Board</span>
                <button
                  onClick={onClose}
                  className="px-4.5 py-1.5 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-850 dark:hover:bg-slate-755 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer"
                >
                  Acknowledge & Close
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Verbatim privacy policy HTML markup as requested
const policyHTMLContent = `
<style>
  .privacy-policy-body [data-custom-class='body'], .privacy-policy-body [data-custom-class='body'] * {
    background: transparent !important;
  }
  .privacy-policy-body [data-custom-class='title'], .privacy-policy-body [data-custom-class='title'] * {
    font-family: Arial, sans-serif !important;
    font-size: 26px !important;
    color: #0f172a !important;
    font-weight: 800 !important;
    line-height: 1.2 !important;
  }
  .privacy-policy-body [data-custom-class='subtitle'], .privacy-policy-body [data-custom-class='subtitle'] * {
    font-family: Arial, sans-serif !important;
    color: #64748b !important;
    font-size: 13px !important;
    font-weight: 600 !important;
  }
  .privacy-policy-body [data-custom-class='heading_1'], .privacy-policy-body [data-custom-class='heading_1'] * {
    font-family: Arial, sans-serif !important;
    font-size: 18px !important;
    color: #0f172a !important;
    font-weight: 700 !important;
    margin-top: 24px !important;
    margin-bottom: 12px !important;
  }
  .privacy-policy-body [data-custom-class='heading_2'], .privacy-policy-body [data-custom-class='heading_2'] * {
    font-family: Arial, sans-serif !important;
    font-size: 15px !important;
    color: #1e293b !important;
    font-weight: 700 !important;
    margin-top: 18px !important;
    margin-bottom: 8px !important;
  }
  .privacy-policy-body [data-custom-class='body_text'], .privacy-policy-body [data-custom-class='body_text'] * {
    color: #334155 !important;
    font-size: 13.5px !important;
    font-family: Arial, sans-serif !important;
    line-height: 1.6 !important;
  }
  .privacy-policy-body [data-custom-class='link'], .privacy-policy-body [data-custom-class='link'] * {
    color: #1d4ed8 !important;
    font-size: 13.5px !important;
    font-family: Arial, sans-serif !important;
    word-break: break-word !important;
    text-decoration: underline !important;
    font-weight: 600 !important;
  }
  .privacy-policy-body h1 {
    font-size: 24px;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 12px;
  }
  .privacy-policy-body h2 {
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .privacy-policy-body h3 {
    font-size: 15px;
    font-weight: 700;
    color: #334155;
    margin-top: 15px;
    margin-bottom: 8px;
  }
  .privacy-policy-body table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
  }
  .privacy-policy-body th, .privacy-policy-body td {
    border: 1px solid #cbd5e1;
    padding: 8px 12px;
    font-size: 12px;
    color: #334155;
  }
  .privacy-policy-body th {
    background-color: #f8fafc;
    font-weight: 700;
  }
  .privacy-policy-body ul {
    list-style-type: disc;
    padding-left: 24px;
    margin: 10px 0;
  }
  .privacy-policy-body li {
    margin-bottom: 6px;
    font-size: 13px;
    color: #334155;
  }
</style>

<div data-custom-class="body">
  <div><strong><span style="font-size: 26px;"><span data-custom-class="title"><h1>PRIVACY POLICY</h1></span></span></strong></div>
  <div><span style="color: rgb(127, 127, 127);"><strong><span style="font-size: 15px;"><span data-custom-class="subtitle">Last updated June 06, 2026</span></span></strong></span></div>
  <div><br></div>
  
  <div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text">This Privacy Notice for <span data-custom-class="body_text"><strong>Cosset Logistics</strong></span> ("<strong>we</strong>," "<strong>us</strong>," or "<strong>our</strong>"), describes how and why we might access, collect, store, use, and/or share ("<strong>process</strong>") your personal information when you use our services ("<strong>Services</strong>"), including when you:</span></span></span></div>
  
  <ul>
    <li data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">Visit our website at <span style="color: rgb(0, 58, 250);"><a target="_blank" data-custom-class="link" href="http://www.cossetlogistics.com">http://www.cossetlogistics.com</a></span> or any website of ours that links to this Privacy Notice</span></span></span></li>
    <li data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">Engage with us in other related ways, including any marketing or events</span></span></span></li>
  </ul>

  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span style="color: rgb(127, 127, 127);"><span data-custom-class="body_text"><strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a target="_blank" data-custom-class="link" href="mailto:info@cossetlogistics.com">info@cossetlogistics.com</a>.</span></span></span></div>
  
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><strong><span style="font-size: 15px;"><span data-custom-class="heading_1"><h2>SUMMARY OF KEY POINTS</h2></span></span></strong></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong><em>This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</em></strong></span></span></div>
  
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about <a data-custom-class="link" href="#personalinfo">personal information you disclose to us</a>.</span></span></div>
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.</span></span></div>
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.</span></span></div>
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about <a data-custom-class="link" href="#infouse">how we process your information</a>.</span></span></div>
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties. Learn more about <a data-custom-class="link" href="#whoshare">when and with whom we share your personal information</a>.</span></span></div>
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about <a data-custom-class="link" href="#privacyrights">your privacy rights</a>.</span></span></div>
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by submitting a <a data-custom-class="link" href="https://app.termly.io/dsar/ba082e75-a238-42cd-a6c5-bbe84e6cf9ec" rel="noopener noreferrer" target="_blank font-light text-royal-blue leading-relaxed">data subject access request</a>, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</span></span></div>
  
  <div style="line-height: 1.5;"><br></div>
  <div id="toc" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>TABLE OF CONTENTS</h2></span></strong></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#infocollect">1. WHAT INFORMATION DO WE COLLECT?</a></span></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#infouse">2. HOW DO WE PROCESS YOUR INFORMATION?</a></span></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#legalbases font-medium">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></span></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#whoshare">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></span></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#cookies">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></span></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#inforetain">6. HOW LONG DO WE KEEP YOUR INFORMATION?</a></span></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#infominors">7. DO WE COLLECT INFORMATION FROM MINORS?</a></span></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#privacyrights">8. WHAT ARE YOUR PRIVACY RIGHTS?</a></span></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#DNT">9. CONTROLS FOR DO-NOT-TRACK FEATURES</a></span></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#uslaws">10. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></span></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#policyupdates">11. DO WE MAKE UPDATES TO THIS NOTICE?</a></span></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#contact">12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></span></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><a data-custom-class="link" href="#request font-semibold">13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></span></div>
  
  <div style="line-height: 1.5;"><br></div>
  <hr style="border-top: 1px solid #e2e8f0;"/>
  
  <div id="infocollect" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>1. WHAT INFORMATION DO WE COLLECT?</h2></span></strong></div>
  <div id="personalinfo" style="line-height: 1.5;"><strong><span data-custom-class="heading_2"><h3>Personal information you disclose to us</h3></span></strong></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong><em>In Short:</em></strong> <em>We collect personal information that you provide to us.</em></span></span></div>
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text">We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</span></span></div>
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>Personal Information Provided by You.</strong> The personal information we collect may include:</span></span></div>
  <ul>
    <li><span data-custom-class="body_text">email addresses</span></li>
    <li><span data-custom-class="body_text">phone numbers</span></li>
    <li><span data-custom-class="body_text">mailing addresses</span></li>
    <li><span data-custom-class="body_text">usernames</span></li>
    <li><span data-custom-class="body_text">job titles</span></li>
    <li><span data-custom-class="body_text">names</span></li>
  </ul>

  <div id="sensitiveinfo" style="line-height: 1.5;"><strong><span data-custom-class="body_text">Sensitive Information.</span></strong> <span data-custom-class="body_text">We do not process sensitive personal information.</span></div>
  <div style="line-height: 1.5;"><br></div>
  
  <div style="line-height: 1.5;"><strong><span data-custom-class="heading_2"><h3>Information automatically collected</h3></span></strong></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong><em>In Short:</em></strong> <em>Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</em></span></span></div>
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text">We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other network telemetry diagnostics.</span></span></div>
  
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><strong><span data-custom-class="heading_2"><h3>Google API & Location Grounding</h3></span></strong></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text">Our use of information received from Google APIs will adhere to the <a target="_blank" data-custom-class="link" href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>, including the <a target="_blank" data-custom-class="link" href="https://developers.google.com/terms/api-services-user-data-policy#limited-use">Limited Use requirements</a>.</span></span></div>
  
  <div style="line-height: 1.5;"><br></div>
  <hr style="border-top: 1px solid #e2e8f0;"/>
  
  <div id="infouse" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2></span></strong></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong><em>In Short:</em></strong> <em>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We process the personal information only when we have a valid legal reason to do so.</em></span></span></div>
  
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>We process your personal information for a variety of reasons, including:</strong></span></span></div>
  <ul>
    <li><span data-custom-class="body_text"><strong>To deliver and facilitate delivery of services to the user:</strong> We process your contact and logistics requirements to organize routes and dispatch box trucks.</span></li>
    <li><span data-custom-class="body_text"><strong>To send administrative information to you:</strong> Upkeep notices, schedule changes, regulatory disclosures, or quote notifications.</span></li>
    <li><span data-custom-class="body_text"><strong>To fulfill and manage transport calculations:</strong> Securing zero-commitment references, booking details, and direct contact.</span></li>
    <li><span data-custom-class="body_text"><strong>To evaluate and improve our services:</strong> Collecting feedback, reviewing transit lane schedules, and analyzing service efficiency.</span></li>
  </ul>

  <div style="line-height: 1.5;"><br></div>
  <hr style="border-top: 1px solid #e2e8f0;"/>

  <div id="legalbases" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2></span></strong></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong><u><em>If you are located in Canada, this section applies to you.</em></u></strong></span></span></div>
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text">We process your information if you have given us specific permission (express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (implied consent). You can withdraw your consent at any time. In exceptional cases permitted by PIPEDA or provincial laws, we may process without consent (e.g., fraud prevention, investigations, or legal subpoena compliance).</span></span></div>

  <div style="line-height: 1.5;"><br></div>
  <hr style="border-top: 1px solid #e2e8f0;"/>

  <div id="whoshare" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2></span></strong></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong><em>In Short:</em></strong> <em>We may share information in connection with business transfers or when utilizing Google Maps Platform APIs.</em></span></span></div>
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>Business Transfers:</strong> We may share or transfer your information during negotiations or completion of any merger, sale of company assets, or financing.</span></span></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text"><strong>Google Maps Platform:</strong> We use location estimation and addressing tools to provide precise routing calculations and dispatch matrices inside Canada.</span></span></div>

  <div style="line-height: 1.5;"><br></div>
  <hr style="border-top: 1px solid #e2e8f0;"/>

  <div id="cookies" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2></span></strong></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text">We may use cookies and similar tracking technologies (like web beacons and pixels) to gather and analyze telemetry data, preserve your preferences, and maintain critical interface configurations.</span></span></div>
  
  <div style="line-height: 1.5;"><br></div>
  <div style="line-height: 1.5;"><b>Google Analytics:</b> <span data-custom-class="body_text">We coordinate with Google Analytics to monitor usage trends block-by-block. You can opt out at any time by visiting <a target="_blank" data-custom-class="link" href="https://tools.google.com/dlpage/gaoptout">Google Analytics Opt-out</a>.</span></div>

  <div style="line-height: 1.5;"><br></div>
  <hr style="border-top: 1px solid #e2e8f0;"/>

  <div id="inforetain" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2></span></strong></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text">We keep your information as long as necessary to complete your dispatch quotes and satisfy corporate tax or accounting retention standards. When no legitimate operational requirement remains, we delete or anonymize your data.</span></span></div>

  <div style="line-height: 1.5;"><br></div>
  <hr style="border-top: 1px solid #e2e8f0;"/>

  <div id="infominors" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>7. DO WE COLLECT INFORMATION FROM MINORS?</h2></span></strong></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text">We do not knowingly solicit or collect data from children under 18. If we identify that a minor has submitted a quote with false contact details, we will immediately delete their information from our booking logs.</span></span></div>

  <div style="line-height: 1.5;"><br></div>
  <hr style="border-top: 1px solid #e2e8f0;"/>

  <div id="privacyrights" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>8. WHAT ARE YOUR PRIVACY RIGHTS?</h2></span></strong></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text">Under Canadian PIPEDA guidelines and provincial regulations, you are guaranteed rights to: (i) access your stored data profile, (ii) demand correction of inaccuracies, and (iii) petition complete erasure. Request these actions easily by opening a <a target="_blank" data-custom-class="link" href="https://app.termly.io/dsar/ba082e75-a238-42cd-a6c5-bbe84e6cf9ec">Data Subject Access Request</a> or contacting our Winnipeg HQ directly.</span></span></div>

  <div style="line-height: 1.5;"><br></div>
  <hr style="border-top: 1px solid #e2e8f0;"/>

  <div id="uslaws" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>10. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2></span></strong></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text">If you are a resident of California, Colorado, Texas, or other US states with active privacy acts, you possess legal paths to verify, correct, export, or strike your customer profiles. We do not sell or sell-to-share personal customer details. To assert US jurisdiction rights, submit a <a target="_blank" data-custom-class="link" href="https://app.termly.io/dsar/ba082e75-a238-42cd-a6c5-bbe84e6cf9ec">data subject request</a>.</span></span></div>

  <div style="line-height: 1.5;"><br></div>
  <hr style="border-top: 1px solid #e2e8f0;"/>

  <div id="contact" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2></span></strong></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text">For corporate complaints, inquiry dispatch requests, or standard legal reviews, resolve with our Operations Board:</span></span></div>
  <p><span data-custom-class="body_text"><strong>Cosset Logistics Inc.</strong></span><br/>
  <span data-custom-class="body_text">Winnipeg, Manitoba, Canada</span><br/>
  <span data-custom-class="body_text">Email: <a target="_blank" data-custom-class="link" href="mailto:info@cossetlogistics.com">info@cossetlogistics.com</a></span></p>

  <div style="line-height: 1.5;"><br></div>
  <hr style="border-top: 1px solid #e2e8f0;"/>

  <div id="request" style="line-height: 1.5;"><strong><span data-custom-class="heading_1"><h2>13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2></span></strong></div>
  <div style="line-height: 1.5;"><span style="font-size: 15px;"><span data-custom-class="body_text">Submit a direct claim to index, review, revise, or permanently delete your customer records. Start the claim process with our secure portal verification: <a target="_blank" data-custom-class="link" href="https://app.termly.io/dsar/ba082e75-a238-42cd-a6c5-bbe84e6cf9ec">Data Subject Access Request Form</a>.</span></span></div>
</div>
`;
