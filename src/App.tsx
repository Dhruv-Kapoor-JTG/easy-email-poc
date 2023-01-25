import React, { useCallback, useEffect, useState, useContext } from 'react';
// import { loadComponents } from './components'
import { BlockManager, BasicType, AdvancedType, JsonToMjml, createCustomBlock, MjmlToJson } from 'easy-email-core';
import { EmailEditor, EmailEditorProvider, BlockAvatarWrapper, Stack, EmailEditorProviderProps, IEmailTemplate, BlockAvatarWrapperProps } from 'easy-email-editor';
import { AttributePanel, AttributesPanelWrapper, BlockAttributeConfigurationManager, ExtensionProps, StandardLayout, TextField } from 'easy-email-extensions';
import { useWindowSize } from 'react-use';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Liquid } from 'liquidjs';
import mjml from 'mjml-browser';
import _ from 'lodash'
import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
import template from './template.json'

// theme, If you need to change the theme, you can make a duplicate in https://arco.design/themes/design/1799/setting/base/Color
import '@arco-themes/react-easy-email-theme/css/arco.css';
import { useBlock } from "easy-email-editor";
// const { undo } = useBlock()

const defaultCategories: ExtensionProps['categories'] = [
  {
    label: 'Content',
    active: true,
    blocks: [
      {
        type: BasicType.RAW,
      },
      {
        type: AdvancedType.TEXT,
      },
      {
        type: AdvancedType.IMAGE,
        payload: { attributes: { padding: '0px 0px 0px 0px' } },
      },
      {
        type: AdvancedType.BUTTON,
      },
      {
        type: AdvancedType.DIVIDER,
      },
      {
        type: AdvancedType.SPACER,
      },
      {
        type: AdvancedType.WRAPPER,
      },
      {
        type: AdvancedType.ACCORDION
      },
      {
        type: AdvancedType.CAROUSEL
      },
      {
        type: AdvancedType.NAVBAR
      },
      {
        type: AdvancedType.GROUP
      },
      {
        type: AdvancedType.COLUMN
      },
      {
        type: AdvancedType.SECTION
      }
    ]
  },  
  {
    label: 'Layout',
    active: false,
    displayType: 'column',
    blocks: [
      {
        title: '2 columns',
        payload: [
          ['50%', '50%'],
          ['33%', '67%'],
          ['67%', '33%'],
          ['25%', '75%'],
          ['75%', '25%'],
        ],
      },
      {
        title: '3 columns',
        payload: [
          ['33.33%', '33.33%', '33.33%'],
          ['25%', '25%', '50%'],
          ['50%', '25%', '25%'],
        ],
      },
      {
        title: '4 columns',
        payload: [['25%', '25%', '25%', '25%']],
      },
    ],
  },
  {
    label: 'Custom',
    active: true,
    displayType: 'custom',
    blocks: [
       <BlockAvatarWrapper type='footer'>
        <div style={{textAlign: 'center', padding: '12px'}}>
          <img src='http://res.cloudinary.com/dwkp0e1yo/image/upload/v1667561946/rz77nkckvnwootr9ctrm.png'></img>
          <div style={{marginTop: "8px"}}>Footer</div>
        </div>
       </BlockAvatarWrapper>,
       <BlockAvatarWrapper type='custom-text'>
       <div style={{textAlign: 'center', padding: '12px'}}>
         <img src='http://res.cloudinary.com/dwkp0e1yo/image/upload/v1667561946/rz77nkckvnwootr9ctrm.png'></img>
         <div style={{marginTop: "8px"}}>Custom Text</div>
       </div>
      </BlockAvatarWrapper>,
    ],
  },
];
const initialValues = {
  subject: 'Welcome to Easy-email',
  subTitle: 'Nice to meet you!',
  content: BlockManager.getBlockByType(BasicType.PAGE)!.create({}),
};


export default function App() {

  const onBeforePreview: EmailEditorProviderProps['onBeforePreview'] = useCallback(
    (html: string, mergeTags: any) => {
      const engine = new Liquid();
      return engine.parseAndRenderSync(
        engine.parseAndRenderSync(html, mergeTags),
        mergeTags
      )
    }, [],
  );

  const [values, setValues] = useState<any>();

  useEffect(() => {
    setTimeout(() => {
      const mjmll = `
        <mjml>
          <mj-head>         
            <mj-html-attributes>
              <mj-html-attribute class="easy-email" multiple-attributes="false" attribute-name="text-color" text-color="#000000"></mj-html-attribute>
              <mj-html-attribute class="easy-email" multiple-attributes="false" attribute-name="font-family" font-family="-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;,&#x27;Helvetica Neue&#x27;, sans-serif"></mj-html-attribute>
              <mj-html-attribute class="easy-email" multiple-attributes="false" attribute-name="font-size" font-size="14px"></mj-html-attribute>
              <mj-html-attribute class="easy-email" multiple-attributes="false" attribute-name="line-height" line-height="1.7"></mj-html-attribute>
              <mj-html-attribute class="easy-email" multiple-attributes="false" attribute-name="font-weight" font-weight="400"></mj-html-attribute>
              <mj-html-attribute class="easy-email" multiple-attributes="false" attribute-name="responsive" responsive="true"></mj-html-attribute>
            </mj-html-attributes>
            <mj-attributes>
              <mj-all font-family="-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;,&#x27;Helvetica Neue&#x27;, sans-serif" />
              <mj-text font-size="14px" />
              <mj-text color="#000000" />
              <mj-text line-height="1.7" />
              <mj-text font-weight="400" />
            </mj-attributes>
          </mj-head>
          <mj-body background-color="#efeeea" width="620px" padding="100px" ><mj-section padding="0px" text-align="left" ><mj-column ><mj-image padding="20px 0px 13px 0px" border="none" direction="ltr" text-align="center" align="center" height="auto" src="{{college_logo}}" width="120px" container-background-color="#f0f0f0" ></mj-image></mj-column></mj-section><mj-wrapper padding="0px 0px 0px 0px" border="none" direction="ltr" text-align="center" background-color="#5D21D1" border-radius="10px 10px 0 0" ><mj-section padding="0 25px 0 25px" text-align="left" ><mj-column><mj-custom-text padding="10px 0px" line-height="1.7" font-weight="600" font-size="24px" color="#FFFFFF" mergeTagKey="heading">{{heading | safe}}</mj-custom-text></mj-column></mj-section></mj-wrapper><mj-wrapper padding="30px 30px 30px 30px" border="none" direction="ltr" text-align="center" border-radius="0 0 10px 10px" background-color="#FFFFFF" ><mj-section padding="0px" text-align="left" ><mj-column ><mj-text padding="10px 0 10px 0" align="left" font-family="Arial, Helvetica, sans-serif" color="#393937" font-size="20px" line-height="25px" contenteditable="false"><b>Subject</b></mj-text></mj-column></mj-section><mj-section padding="0px" text-align="left" ><mj-column ><mj-custom-text padding="0px" align="left" font-family="Arial, Helvetica, sans-serif" font-size="14px" color="#393937" font-size="12px" font-weight="400" mergeTagKey="content" >{{content | safe}}</mj-custom-text></mj-column></mj-section><mj-section padding="0px" text-align="left" ><mj-column ><mj-text padding="10px 0 10px 0" align="left" color="#666666" font-family="Arial, Helvetica, sans-serif" font-size="13px" line-height="17px" letter-spacing="0.8" >Regards,<div>{{custom_signature_details.name}}<br><div>{{custom_signature_details.designation}}</div></div></mj-text></mj-column></mj-section></mj-section><mj-section padding="0px" text-align="left" ><mj-column ><mj-button align="center" background-color="#5D21D1" color="#ffffff" font-weight="normal" border-radius="3px" padding="10px 25px 10px 25px" inner-padding="10px 25px 10px 25px" line-height="120%" target="_blank" vertical-align="middle" border="none" text-align="center" href="http://ncit.localhost:5050/d/CPdXXf/" >Go To Dashboard</mj-button></mj-column></mj-section></mj-wrapper><mj-wrapper ><mj-section padding="0px" ><mj-column padding="0px" border="none" vertical-align="top" ><mj-image align="center" height="auto" width="100px" padding="25px 0 25px 0" src="http://res.cloudinary.com/dwkp0e1yo/image/upload/v1667561946/rz77nkckvnwootr9ctrm.png" ></mj-image><mj-text font-size="12px" line-height="17px" padding="0" align="center" font-family="Helvetica, Arial, sans-serif;" color="#848484" >This email was intended for {{user_full_name}} ({{email}})</mj-text><mj-text font-size="12px" line-height="17px" padding="0" align="center" font-family="Helvetica, Arial, sans-serif;" color="#848484" >© 2018 POD.ai From Calyxpod Talent Solutions Pvt. Ltd.</mj-text></mj-column></mj-section></mj-wrapper>
            
          </mj-body>
        </mjml>
      `;
      const new_mjml = `<mjml>
      <mj-head>
        <mj-attributes>
          <!-- Resets -->
          <mj-section padding="0px 0px 0px 0px"></mj-section>
          <mj-column padding="0px 0px 0px 0px"></mj-column>
          <mj-text css-class="font-base" padding="0"></mj-text>
          <mj-image padding="0"></mj-image>
          <mj-social-element css-class="font-base" padding="0"></mj-social-element>
          <mj-social padding="0"></mj-social>
          <mj-hero padding="0"></mj-hero>
          <mj-wrapper padding="0"></mj-wrapper>
          <mj-image font-size="0"></mj-image>
          <mj-divider padding="0"></mj-divider>
          <mj-table padding="0"></mj-table>
    
          <!-- Backgrounds -->
          <mj-class name="body-bg" background-color="#F6F6F6"></mj-class>
          <mj-class name="white-bg" background-color="#FFFFFF"></mj-class>
          <mj-class name="blue-bg" background-color="#eff5ff"></mj-class>
          <mj-class name="grey-bg" background-color="#F4F4F3"></mj-class>
          <mj-class name="dull-grey-bg" background-color="#EDEDE9"></mj-class>
    
          <!-- Image sources -->
          <!-- TODO: 
            1. To be replaced with assets, using hosted one for testing
            2. alts to be added for certain images     
          -->
          <mj-class name="src-hero-bg" src="https://test-bucket-calyx.s3.amazonaws.com/thumbnails/community_login_bg_images/photo-1562774053-701939374585.jpeg.0x300_q85_pad_image_size_ratio_const-dashboard_and_mail.jpg"></mj-class>
          <mj-class name="src-calendar" src="https://i.ibb.co/drTJzz6/Vector-10.png" alt="calendar"></mj-class>
          <mj-class name="src-logo" src="http://s3.amazonaws.com/jtg-marcomm/wp-content/uploads/2019/08/09103837/jtg-logo.png" alt="college-logo"></mj-class>
          <mj-class name="src-header-curve" src="https://i.ibb.co/16kjgP2/header-curve.png"></mj-class>
          <mj-class name="src-blockquote" src="https://i.ibb.co/Sf6fWYr/1.png"></mj-class>
          <mj-class name="src-blockquote-inverted" src="https://i.ibb.co/PmymY5M/image.png"></mj-class>
          <mj-class name="src-person" src="https://i.ibb.co/jMCLS3J/craig-mckay-jm-URdhtm7-Ng-unsplash.jpg"></mj-class>
          <mj-class name="src-podlogo" src="https://i.ibb.co/7Gzyh0S/Vector.png"></mj-class>
          <mj-class name="src-playstore" src="https://i.ibb.co/GpfTnJr/Frame-8179-2.png"></mj-class>
          <mj-class name="src-appstore" src="https://i.ibb.co/L9WFMBp/Frame-8185.png"></mj-class>
    
          <!-- Typography -->
          <mj-class name="heading--xlg" font-weight="700" font-size="32px" line-height="42px"></mj-class>
          <mj-class name="heading--lg" font-weight="700" font-size="24px" line-height="32px"></mj-class>
          <mj-class name="heading--md" font-weight="700" font-size="18px" line-height="24px"></mj-class>
    
          <mj-class name="text--xlg" font-size="20px" line-height="32px" font-weight="400"></mj-class>
          <mj-class name="text--lg" font-size="16px" line-height="24px" font-weight="400"></mj-class>
          <mj-class name="text--md" font-size="14px" line-height="20px" font-weight="400"></mj-class>
          <mj-class name="text--sm" font-size="12px" line-height="16px" font-weight="400"></mj-class>
          <mj-class name="text--xsm" font-size="10px" line-height="12px" font-weight="400"></mj-class>
    
          <!-- Font weights -->
          <mj-class name="text--bold" font-weight="700"></mj-class>
          <mj-class name="text--semi-bold" font-weight="600"></mj-class>
          <mj-class name="text--medium" font-weight="500"></mj-class>
          <mj-class name="text--regular" font-weight="400"></mj-class>
    
          <!-- Colors -->
          <mj-class name="text--dark" color="#333333"></mj-class>
          <mj-class name="text--grey" color="#666666"></mj-class>
          <mj-class name="text--black" color="#111111"></mj-class>
          <mj-class name="text--white" color="#ffffff"></mj-class>
          <mj-class name="text--link" color="#0A71D1"></mj-class>
    
          <mj-divider border-color="#e9e8e8"></mj-divider>
    
        </mj-attributes>
        <mj-style>
          .font-base,
          .font-base p,
          .font-base div,
          .font-base span {
          font-family: Arial, Helvetica, sans-serif;
          word-break: break-word;
          mso-line-height-rule: exactly;
          }
    
          .border-collapse-separate,
          .border-collapse-separate table {
          border-collapse: separate;
          }
        </mj-style>
        <mj-html-attributes>
          <mj-html-attribute class="easy-email" multiple-attributes="false" attribute-name="text-color" text-color="#666666"></mj-html-attribute>
          <mj-html-attribute class="easy-email" multiple-attributes="false" attribute-name="font-family" font-family="-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;,&#x27;Helvetica Neue&#x27;, sans-serif"></mj-html-attribute>
          <mj-html-attribute class="easy-email" multiple-attributes="false" attribute-name="font-size" font-size="14px"></mj-html-attribute>
          <mj-html-attribute class="easy-email" multiple-attributes="false" attribute-name="line-height" line-height="1.7"></mj-html-attribute>
          <mj-html-attribute class="easy-email" multiple-attributes="false" attribute-name="font-weight" font-weight="400"></mj-html-attribute>
          <mj-html-attribute class="easy-email" multiple-attributes="false" attribute-name="responsive" responsive="true"></mj-html-attribute>
    
        </mj-html-attributes>
    
    
      </mj-head>
      <mj-body width="600px" mj-class="body-bg">
    
    
        <!-- Email title -->
        <mj-section padding="12px 16px">
          <mj-group>
            <mj-column vertical-align="middle">
              <mj-text align="left" mj-class="text--md text--medium text--dark">
                Update for You
              </mj-text>
            </mj-column>
            <mj-column vertical-align="middle">
              <mj-social align="right" font-size="15px" icon-size="30px" mode="horizontal">
                <mj-social-element text-padding="0 0 0 5px" align="right" icon-size="12px" mj-class="text--sm text--grey src-calendar">
                  09 Jan 2023
                </mj-social-element>
              </mj-social>
            </mj-column>
          </mj-group>
        </mj-section>
    
    
        <!-- College / company title -->
        <mj-section mj-class="white-bg">
          <mj-group>
            <mj-column padding="30px 0 30px 16px" width="20.5%" vertical-align="middle">
              <mj-image width="72px" mj-class="src-logo" />
            </mj-column>
            <mj-column width="59%" padding="35px 0" vertical-align="middle">
              <mj-text align="left" padding-left="15px" mj-class="heading--lg text--semi-bold text--black">
                Josh Technology group
              </mj-text>
            </mj-column>
            <mj-column width="20.5%" vertical-align="top">
              <mj-image mj-class="src-header-curve" width="74px" align="right" />
            </mj-column>
          </mj-group>
        </mj-section>
    
    
        <!-- Interview schedule template -->
        <mj-wrapper padding="32px 16px" direction="ltr" text-align="center">
          <mj-section padding="32px 16px" border="none" direction="ltr" text-align="center" background-color="#5d21d1" border-radius="10px 10px 0 0">
            <mj-column padding="0px" border="none" vertical-align="top">
              <mj-text align="left" font-size="20px" line-height="25px" font-weight="500" color="#FFFFFF">
                <div style="text-align: center;"><span style="word-spacing: normal;">Calyxpod Admin has assigned you a Video Interview</span></div>
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-section text-align="center" background-color="#5d21d1">
            <mj-group>
              <mj-column vertical-align="top" width="34%"></mj-column>
              <mj-column border="4px solid #fff" vertical-align="middle" border-radius="100px" width="32%" css-class="border-collapse-separate">
                <mj-text padding="62px 0px" align="center" color="#fff" font-size="50px" css-class="red ">AA</mj-text>
              </mj-column>
              <mj-column vertical-align="top" width="34%"></mj-column>
            </mj-group>
          </mj-section>
          <mj-section text-align="left">
            <mj-column >
              <mj-text padding="10px 25px 10px 25px" align="center" color="white" container-background-color="#5d21d1" font-size="18px">Abhishek1
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-section padding="16px 32px" background-repeat="repeat" background-size="auto" background-position="top center" border="none" direction="ltr" text-align="center" background-color="#f7f6fd">
            <mj-column border="none" vertical-align="top">
              <mj-text align="center" color="#666666" font-size="18px" line-height="20px" font-weight="400">09:00 AM 06 Jan, 2023 - 10:00 AM 06 Jan, 2023
              </mj-text>
              <mj-text padding-top="10px" align="center" color="#666666" font-size="18px" line-height="20px" font-weight="400">Video Interview
              </mj-text>
            </mj-column>
          </mj-section>
          <mj-section padding="16px" background-repeat="repeat" background-size="auto" background-position="top center" border="none" direction="ltr" text-align="center" background-color="white" border-radius="0 0 10px 10px">
            <mj-column padding="0px" border="none" vertical-align="top">
              <mj-text padding="20px 0 10px 0" align="left" font-size="16px" line-height="20px" color="#393937" css-class="random " font-weight="400">Go the interview page and click on start call. New window will open with the video interview.
              </mj-text>
              <mj-button align="center" background-color="#5d21d1" color="#ffffff" font-weight="500" border-radius="3px" inner-padding="7px 25px 7px 25px" line-height="28px" target="_blank" vertical-align="middle" border="none" text-align="center" href="#" width="180px" font-size="14px">Interview Page</mj-button>
              <mj-text align="left" color="#393937" font-size="16px" line-height="20px">You can click on the link below to view the candidate&#x27;s profile and other interview details if any.
              </mj-text>
              <mj-button align="center" background-color="#5d21d1" color="#ffffff" font-weight="500" border-radius="4px" padding="16px 0" inner-padding="12px 25px" line-height="18px" target="_blank" vertical-align="middle" border="none" text-align="center" href="#" width="180px" font-size="14px" >Candidate Profile</mj-button>
            </mj-column>
          </mj-section>
        </mj-wrapper>
    
        <!-- Footer -->
        <mj-section mj-class="grey-bg" padding="16px 16px 0">
          <mj-group width="100%">
            <mj-column width="50%">
              <mj-image align="left" mj-class="src-podlogo" width="130px" height="32px"></mj-image>
            </mj-column>
            <mj-column width="50%">
              <mj-text align="right" mj-class="text--xsm text--dark text--semi-bold">
                Get Mobile Application
              </mj-text>
              <mj-social padding-top="8px" align="right" icon-size="36px" mode="horizontal">
                <mj-social-element mj-class="src-playstore" padding="0 10px 0 0">
                </mj-social-element>
                <mj-social-element mj-class="src-appstore">
                </mj-social-element>
              </mj-social>
            </mj-column>
          </mj-group>
        </mj-section>
    
        <mj-section mj-class="grey-bg" padding="0 16px 16px">
          <mj-column width="100%">
            <mj-social padding-top="12px" align="left" mj-class="text--sm">
              <mj-social-element icon-size="14px" text-padding="0 0 0 8px" src="https://i.ibb.co/WvZc428/Vector-11.png">
                Need assistance? Email us at <span class="text--link">support@pod.ai</span>
              </mj-social-element>
            </mj-social>
          </mj-column>
        </mj-section>
    
        <mj-section padding="16px" mj-class="dull-grey-bg">
          <mj-column>
            <mj-text mj-class="text--sm text--grey">
              <p style="margin:0">
                This is a system-generated email, please don't reply to this message. You received this email because you are subscribed to Pod. If you don't want to hear from us.
                <a href="#" class="text--link">Click here to Unsubscribe.</a>
              </p>
            </mj-text>
          </mj-column>
        </mj-section>
    
        <!-- = Footer ends -->
    
      </mj-body>
    </mjml>`
      initialValues.content = BlockManager.getBlockByType(BasicType.PAGE)!.create(MjmlToJson(new_mjml));
      setValues(initialValues);
      const JSON = MjmlToJson(new_mjml); 
      console.log("JSON ---", JSON);
      console.log("MJML ---", JsonToMjml(JSON));
    }, 1000);
  }, []);

  const _mergeTags = {
    custom_signature_details: {
      name: "Dhruv Kapoor",
      designation: "Head"
    },
    user_full_name: 'Dhruv Kapoor',
    test: '<div><img style="height: 100px" src="https://static.vecteezy.com/system/resources/previews/005/170/934/original/shield-college-university-logo-free-vector.jpg"></br><b>{{email}}</b></div>',
    email: "dhruv.kapoor@joshtechnologygroup.com",
    college_logo: "https://static.vecteezy.com/system/resources/previews/005/170/934/original/shield-college-university-logo-free-vector.jpg",
    items: [1,2,3,4,5],
    heading: "<div style=\"text-align: center;\"><font style=\"\" size=\"5\"><b style=\"\">Note for You!</b></font></div>",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis feugiat libero. Cras elit enim, malesuada eget fringilla a, sollicitudin eu erat. Pellentesque faucibus dignissim tincidunt. Nulla eu lorem libero. In lectus nisl, gravida quis hendrerit ac, lacinia et leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed eget arcu ornare, ullamcorper diam at, cursus risus.<div><br></div><div>Proin in risus at sem ultricies fermentum. Praesent nec lectus nulla. Nulla nec lectus eleifend, tempus lacus vel, convallis nulla. Sed tempor lacus eu enim fringilla, vel finibus arcu mollis. Mauris enim metus, commodo quis iaculis eget, tincidunt vitae neque. Nullam vehicula porta libero et scelerisque. Quisque at ante venenatis, porta mauris id, venenatis leo. Nunc dictum nulla at turpis facilisis, eget ultrices orci egestas. Nulla diam arcu, fermentum sed neque vitae, porttitor ullamcorper neque. Proin condimentum, nisi eget efficitur porttitor, libero justo ullamcorper justo, efficitur elementum lectus sapien in neque. Proin non lorem euismod lectus congue semper.",
  }
  const mergeTags = {
    "custom_signature_details": {
        "name": "Dhruv Kapoor",
        "designation": "Head"
    },
    "user_full_name": "Dhruv Kapoor",
    "test": "<div><img style=\"height: 100px\" src=\"https://static.vecteezy.com/system/resources/previews/005/170/934/original/shield-college-university-logo-free-vector.jpg\"></br><b>{{email}}</b></div>",
    "email": "dhruv.kapoor@joshtechnologygroup.com",
    "college_logo": "https://static.vecteezy.com/system/resources/previews/005/170/934/original/shield-college-university-logo-free-vector.jpg",
    "items": [
        1,
        2,
        3,
        4,
        5
    ],
    "heading": "<div style=\"text-align: center;\"><font style=\"\" size=\"5\"><b style=\"\">Note for You! &lt;div&gt; Hello &lt;/div&gt;</b></font></div>",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis feugiat libero. Cras elit enim, malesuada eget fringilla a, sollicitudin eu erat. Pellentesque faucibus dignissim tincidunt. Nulla eu lorem libero. In lectus nisl, gravida quis hendrerit ac, lacinia et leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed eget arcu ornare, ullamcorper diam at, cursus risus.<div><br></div><div>Proin in risus at sem ultricies fermentum. Praesent nec lectus nulla. Nulla nec lectus eleifend, tempus lacus vel, convallis nulla. Sed tempor lacus eu enim fringilla, vel finibus arcu mollis. Mauris enim metus, commodo quis iaculis eget, tincidunt vitae neque. Nullam vehicula porta libero et scelerisque. Quisque at ante venenatis, porta mauris id, venenatis leo. Nunc dictum nulla at turpis facilisis, eget ultrices orci egestas. Nulla diam arcu, fermentum sed neque vitae, porttitor ullamcorper neque. Proin condimentum, nisi eget efficitur porttitor, libero justo ullamcorper justo, efficitur elementum lectus sapien in neque. Proin non lorem euismod lectus congue semper."
}

  const exportHtml = (values) => {
    if (!values) return;
    const html = mjml(
      JsonToMjml({
        data: values.content,
        mode: 'production',
        context: values.content,
        dataSource: mergeTags,
      }),
      {
        beautify: true,
        validationLevel: 'soft',
      },
    ).html;
    // console.log(html)
    // console.log(JsonToMjml({
    //   data: values.content,
    //   mode: 'original',
    //   context: values.content,
    //   dataSource: mergeTags,
    // }))
    console.log(mergeTags)

  }
  const exportJson = (values) => {
    if (!values) return;
    console.log(JSON.stringify(values.content));
  }

  const onRemoveCollection = ({ id }) => {
    console.log("🚀 ~ file: App.tsx ~ line 125 ~ onRemoveCollection ~ payload", id)

  }

  const onUploadImage = async (data) => {
    console.log("🚀 ~ file: App.tsx ~ line 120 ~ onUploadImage ~ data", data)
    return 'www.google.com'
  }

  return (
    values ? <EmailEditorProvider
      data={values}
      height={'calc(100vh - 32px)'}
      dashed={false}
      mergeTags={mergeTags}
      onBeforePreview={onBeforePreview}
      onRemoveCollection={onRemoveCollection}
      onUploadImage={onUploadImage}
      disableBlockOptions={true}
    >
      {({ values }) => {
        return (
          <>
            <button onClick={() => exportHtml(values)}>Log HTML</button>
            <button onClick={() => exportJson(values)}>Log JSON</button>
            <StandardLayout
              compact={true}
              showSourceCode={false}
              categories={defaultCategories}
              showEditPanel={false}
              showConfigurationsPanel={false}
            >
              <EmailEditor/>
            </StandardLayout>
          </>
        );
      }}
      
    </EmailEditorProvider> : <></>
  );
}
