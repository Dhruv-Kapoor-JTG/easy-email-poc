import { AdvancedType, BasicType, BlockManager, createCustomBlock, components, getPreviewClassName } from "easy-email-core";
import { getContentEditableClassName } from "easy-email-editor";
import { merge } from 'lodash';

const { Text, MjmlBlock, Wrapper, Image, Column, Section, Group, Button } = components;

export const footer = createCustomBlock({
  name: "Footer",
  type: 'footer',
  create(payload) {
    const data = {
      type: "footer",
      data: {
        value: {

        }
      },
      attributes: {

      },
      children: []
    };
    return merge(data, payload);
  },
  validParentType: [BasicType.PAGE, AdvancedType.WRAPPER, BasicType.WRAPPER],
  render: ({data, idx, mode, context, dataSource}) => {
    return (
      <Wrapper css-class={mode=='testing' ? getPreviewClassName(idx, data.type) : ''}>
        <Section padding='0px'>
          <Column
            padding='0px'
            border='none'
            vertical-align='top'
          >
            <Image
              align='center'
              height='auto'
              width='100px'
              padding="25px 0 25px 0"
              src="http://res.cloudinary.com/dwkp0e1yo/image/upload/v1667561946/rz77nkckvnwootr9ctrm.png"     
              />
            <Text
              font-size='12px'
              line-height='17px'
              padding="0"
              align='center'
              font-family="Helvetica, Arial, sans-serif;"
              color="#848484"
            >
              This email was intended for &#123;&#123;user_full_name&#125;&#125; (&#123;&#123;email&#125;&#125;)
            </Text>
            <Text
              font-size='12px'
              line-height='17px'
              padding="0"
              align='center'
              font-family="Helvetica, Arial, sans-serif;"
              color="#848484"
            >
              © 2018 POD.ai From Calyxpod Talent Solutions Pvt. Ltd.
            </Text>
          </Column>
        </Section>

      </Wrapper>
    );

  }
});

BlockManager.registerBlocks({ 'footer': footer });

// const myFirstBlock = createCustomBlock({
//   name: 'My first block',
//   type: 'footer',
//   create(payload) {
//     const defaultData = {
//       type: 'footer',
//       data: {
//         value: {
//           buttonText: 'Got it',
//           imageUrl:
//             'https://assets.maocanhua.cn/10dada65-c4fb-4b1f-837e-59a1005bbea6-image.png',
//         },
//       },
//       attributes: {
//         'background-color': '#4A90E2',
//         'text-color': '#ffffff',
//       },
//       children: [],
//     };
//     return merge(defaultData, payload);
//   },
//   validParentType: [BasicType.PAGE, BasicType.WRAPPER],
//   render({ data }) {
//     const { imageUrl, buttonText } = data.data.value;
//     const attributes = data.attributes;

//     const instance = (
//       <Section padding='20px'>
//         <Column>
//           <Image padding='0px 0px 0px 0px' width='100px' src={imageUrl} />
//           <Button
//             background-color={attributes['background-color']}
//             color={attributes['text-color']}
//             href='#'
//           >
//             {buttonText}
//           </Button>
//         </Column>
//       </Section>
//     );
//     return instance;
//   },
// });

// BlockManager.registerBlocks({ 'footer': myFirstBlock });
