// import { RichTextEditor } from "calyx-ui-lib";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm, FormProvider } from 'react-hook-form';
import ReactQuill from 'react-quill/lib';

import 'react-quill/dist/quill.snow.css';
import { Liquid } from 'liquidjs';

export default function App2() {
  var _template = `
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title>
  </title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
  <!--[if lte mso 11]>
    <style type="text/css">
      .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Droid+Sans:300,400,500,700" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Droid+Sans:300,400,500,700);
    @import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700);
    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    }
  </style>
  <style media="screen and (min-width:480px)">
    .moz-text-html .mj-column-per-100 {
      width: 100% !important;
      max-width: 100%;
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }

      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
  <style type="text/css">
  </style>
</head>

<body style="word-spacing:normal;background-color:#efeeea;">
  <div style="background-color:#efeeea;">
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:620px;" width="620" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:620px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:0px;text-align:left;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:620px;" ><![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tbody>
                    <tr>
                      <td align="center" style="background:#f0f0f0;font-size:0px;padding:20px 0px 13px 0px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:120px;">
                                <img height="auto" src="{{college_logo}}" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="120" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:620px;" width="620" bgcolor="#5D21D1" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#5D21D1;background-color:#5D21D1;margin:0px auto;border-radius:10px 10px 0 0;max-width:620px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#5D21D1;background-color:#5D21D1;width:100%;border-radius:10px 10px 0 0;">
        <tbody>
          <tr>
            <td style="border:none;direction:ltr;font-size:0px;padding:20px 0px 20px 0px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="620px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:620px;" width="620" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="margin:0px auto;max-width:620px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:0px;text-align:left;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:620px;" ><![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="left" style="font-size:0px;padding:0 25px 0 25px;word-break:break-word;">
                                  <div style="font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;,&#x27;Helvetica Neue&#x27;, sans-serif;font-size:14px;font-weight:400;line-height:1.7;text-align:left;color:#FFFFFF;">
                                    <div style="text-align: center;"><span style="font-family: Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700;">{{subject}}</span></div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:620px;" width="620" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;border-radius:0 0 10px 10px;max-width:620px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;border-radius:0 0 10px 10px;">
        <tbody>
          <tr>
            <td style="border:none;direction:ltr;font-size:0px;padding:30px 30px 30px 30px;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="620px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:560px;" width="560" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="margin:0px auto;max-width:560px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:0px;text-align:left;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:560px;" ><![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 0 10px 0;word-break:break-word;">
                                  <div style="font-family:Arial, Helvetica, sans-serif;font-size:20px;font-weight:400;line-height:25px;text-align:left;color:#393937;"><b>Subject</b></div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="620px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:560px;" width="560" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="margin:0px auto;max-width:560px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:0px;text-align:left;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:560px;" ><![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="left" style="font-size:0px;padding:0 0 0 0;word-break:break-word;">
                                  <div style="font-family:Arial, Helvetica, sans-serif;font-size:14px;font-weight:400;line-height:20px;text-align:left;color:#393937;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis feugiat libero. Cras elit enim, malesuada eget fringilla a, sollicitudin eu erat. Pellentesque faucibus dignissim tincidunt. Nulla eu lorem libero. In lectus nisl, gravida quis hendrerit ac, lacinia et leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed eget arcu ornare, ullamcorper diam at, cursus risus.<div><br></div>
                                    <div>Proin in risus at sem ultricies fermentum. Praesent nec lectus nulla. Nulla nec lectus eleifend, tempus lacus vel, convallis nulla. Sed tempor lacus eu enim fringilla, vel finibus arcu mollis. Mauris enim metus, commodo quis iaculis eget, tincidunt vitae neque. Nullam vehicula porta libero et scelerisque. Quisque at ante venenatis, porta mauris id, venenatis leo. Nunc dictum nulla at turpis facilisis, eget ultrices orci egestas. Nulla diam arcu, fermentum sed neque vitae, porttitor ullamcorper neque. Proin condimentum, nisi eget efficitur porttitor, libero justo ullamcorper justo, efficitur elementum lectus sapien in neque. Proin non lorem euismod lectus congue semper.</div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="" width="620px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:560px;" width="560" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="margin:0px auto;max-width:560px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:0px;text-align:left;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:560px;" ><![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="left" style="font-size:0px;padding:10px 0 10px 0;word-break:break-word;">
                                  <div style="font-family:Arial, Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0.8;line-height:17px;text-align:left;color:#666666;">Regards,<div>{{custom_signature_details.name}}<br>
                                      <div>{{custom_signature_details.designation}}</div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:620px;" width="620" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:620px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="620px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:620px;" width="620" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div style="margin:0px auto;max-width:620px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="620px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:620px;" width="620" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                        <div style="margin:0px auto;max-width:620px;">
                          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                            <tbody>
                              <tr>
                                <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:620px;" ><![endif]-->
                                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                      <tbody>
                                        <tr>
                                          <td style="border:none;vertical-align:top;padding:0px;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
                                              <tbody>
                                                <tr>
                                                  <td align="center" style="font-size:0px;padding:25px 0 25px 0;word-break:break-word;">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                      <tbody>
                                                        <tr>
                                                          <td style="width:100px;">
                                                            <img height="auto" src="http://res.cloudinary.com/dwkp0e1yo/image/upload/v1667561946/rz77nkckvnwootr9ctrm.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" />
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                                                    <div style="font-family:Helvetica, Arial, sans-serif;;font-size:12px;font-weight:400;line-height:17px;text-align:center;color:#848484;">This email was intended for {{user_full_name}} ({{email}})</div>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                                                    <div style="font-family:Helvetica, Arial, sans-serif;;font-size:12px;font-weight:400;line-height:17px;text-align:center;color:#848484;">© 2018 POD.ai From Calyxpod Talent Solutions Pvt. Ltd.</div>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <!--[if mso | IE]></td></tr></table><![endif]-->
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:620px;" width="620" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:620px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td align="left" class="" width="620px" ><![endif]-->
              <div style="font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;,&#x27;Helvetica Neue&#x27;, sans-serif;font-size:14px;font-weight:400;line-height:1.7;text-align:left;color:#000000;">MJ Text {{item}}</div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:620px;" width="620" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="margin:0px auto;max-width:620px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td align="left" class="" width="620px" ><![endif]-->
              <div style="font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;,&#x27;Helvetica Neue&#x27;, sans-serif;font-size:14px;font-weight:400;line-height:1.7;text-align:left;color:#000000;">{{text}}</div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]></td></tr></table><![endif]-->
  </div>
</body>

</html>
  `;
  const [mergeTags, setMergeTags] = useState({
    custom_signature_details: {
      name: "Dhruv Kapoor",
      designation: "Head"
    },
    user_full_name: 'Dhruv Kapoor',
    email: "dhruv.kapoor@joshtechnologygroup.com",
    college_logo: "https://static.vecteezy.com/system/resources/previews/005/170/934/original/shield-college-university-logo-free-vector.jpg",
    items: [1,2,3,4,5],
    text: "hgchcjhctc",
    subject: "Note for You!",
  });
  const [editorState, setEditorState] = useState(mergeTags.subject);

  const [template, setTemplate] = useState(_template);
  const reactQuillRef = useRef<ReactQuill>(null);
  const methods = useForm();

  useEffect(() => {
    const engine = new Liquid();
    setTemplate(engine.parseAndRenderSync(_template, mergeTags));
  }, [mergeTags]);
  
  const onChange = (value) => {
    setEditorState(value);
    if (mergeTags.subject != value) {
      const _mergeTags = {...mergeTags};
      _mergeTags.subject = value;
      setMergeTags(_mergeTags);
    console.log("🚀 ~ file: App2.tsx:404 ~ onChange ~ mergeTags", _mergeTags.subject)

    }

  };

  return (
    <div style={{display: 'flex'}}>
      <div style={{flex: '50%'}}>
      <FormProvider {...methods} >
      <form >
      <Controller
        name="Controller"
        defaultValue={''}
        render={({ field: { ref, ...resField } }) => (
          <>
          <ReactQuill
            theme='snow'
            value={editorState}
            onChange={onChange}
            placeholder={'Subject'}
            modules={{
            }}
            bounds='#quill-container'
            onFocus={()=>{}}
            readOnly={false}
            scrollingContainer='#quill-container'
          />
          </>
        )}
      />
      </form>
      </FormProvider>
      </div>
      <div style={{flex: '50%'}} dangerouslySetInnerHTML={{__html: template}}>
      </div>
    </div>
  );
}