import React, { useCallback, useEffect, useState, useContext } from 'react';
import './components'
import { BlockManager, BasicType, AdvancedType, JsonToMjml, createCustomBlock } from 'easy-email-core';
import { EmailEditor, EmailEditorProvider, BlockAvatarWrapper, Stack, EmailEditorProviderProps, IEmailTemplate, BlockAvatarWrapperProps } from 'easy-email-editor';
import { AttributePanel, AttributesPanelWrapper, BlockAttributeConfigurationManager, ExtensionProps, StandardLayout, TextField } from 'easy-email-extensions';
import { useWindowSize } from 'react-use';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Liquid } from 'liquidjs';
import mjml from 'mjml-browser';
import _ from 'lodash'
import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';

// theme, If you need to change the theme, you can make a duplicate in https://arco.design/themes/design/1799/setting/base/Color
import '@arco-themes/react-easy-email-theme/css/arco.css';
import { useBlock } from "easy-email-editor";
import { Form } from 'react-final-form';

// const { undo } = useBlock()

const defaultCategories: ExtensionProps['categories'] = [
  {
    label: 'Content',
    active: true,
    blocks: [
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
        type: AdvancedType.SOCIAL,
      },
      {
        type: AdvancedType.DIVIDER,
      },
      {
        type: AdvancedType.SPACER,
      },
      {
        type: AdvancedType.HERO,
      },
      {
        type: AdvancedType.WRAPPER,
      },
    ]
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
       </BlockAvatarWrapper>
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
      const tpl = engine.parse(html);
      return engine.renderSync(tpl, mergeTags);
    }, [],
  );

  const mergeTags = {
    custom_signature_details: {
      name: "Dhruv Kapoor",
      designation: "Head"
    },
    user_full_name: "Dhruv Kapoor",
    email: "dhruv.kapoor@joshtechnologygroup.com",
    college_logo: "https://static.vecteezy.com/system/resources/previews/005/170/934/original/shield-college-university-logo-free-vector.jpg"
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
    console.log(html)
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
    // <Form onSubmit={()=>{}}>
    //   {() => (

    <EmailEditorProvider
      data={initialValues}
      height={'calc(100vh - 72px)'}
      dashed={false}
      mergeTags={mergeTags}
      onBeforePreview={onBeforePreview}
      // onRemoveCollection={onRemoveCollection}
      // onUploadImage={onUploadImage}
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
            >
              <EmailEditor/>
            </StandardLayout>
          </>
        );
      }}
      
    </EmailEditorProvider>
    // )}
    // </Form>
  );
}
