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
            <mj-raw renderInEditor="true">
              {% for item in items %}
                <mj-text>{{item}}</mj-text>
              {% endfor %}
            </mj-raw>
          </mj-body>
        </mjml>
      `;
      initialValues.content = BlockManager.getBlockByType(BasicType.PAGE)!.create(MjmlToJson(mjmll));
      setValues(initialValues);
    }, 1000);
  }, []);

  const mergeTags = {
    custom_signature_details: {
      name: "Dhruv Kapoor",
      designation: "Head"
    },
    user_full_name: 'Dhruv Kapoor',
    test: '<div><img style="height: 100px" src="https://static.vecteezy.com/system/resources/previews/005/170/934/original/shield-college-university-logo-free-vector.jpg"></br><b>{{email}}</b></div>',
    email: "dhruv.kapoor@joshtechnologygroup.com",
    college_logo: "https://static.vecteezy.com/system/resources/previews/005/170/934/original/shield-college-university-logo-free-vector.jpg",
    items: [1,2,3,4,5],
    heading: `<div contenteditable="true" style="text-align: center;"><font style="" size="5"><b style="">Note for You!</b></font></div>`,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis feugiat libero. Cras elit enim, malesuada eget fringilla a, sollicitudin eu erat. Pellentesque faucibus dignissim tincidunt. Nulla eu lorem libero. In lectus nisl, gravida quis hendrerit ac, lacinia et leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed eget arcu ornare, ullamcorper diam at, cursus risus.<div><br></div><div>Proin in risus at sem ultricies fermentum. Praesent nec lectus nulla. Nulla nec lectus eleifend, tempus lacus vel, convallis nulla. Sed tempor lacus eu enim fringilla, vel finibus arcu mollis. Mauris enim metus, commodo quis iaculis eget, tincidunt vitae neque. Nullam vehicula porta libero et scelerisque. Quisque at ante venenatis, porta mauris id, venenatis leo. Nunc dictum nulla at turpis facilisis, eget ultrices orci egestas. Nulla diam arcu, fermentum sed neque vitae, porttitor ullamcorper neque. Proin condimentum, nisi eget efficitur porttitor, libero justo ullamcorper justo, efficitur elementum lectus sapien in neque. Proin non lorem euismod lectus congue semper.",
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
              showSourceCode={true}
              categories={defaultCategories}
              showEditPanel={true}
            >
              <EmailEditor/>
            </StandardLayout>
          </>
        );
      }}
      
    </EmailEditorProvider> : <></>
  );
}
