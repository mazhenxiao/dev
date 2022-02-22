import { Maybe } from '@/utils/ts-helper';
import { Form, InputNumberProps } from 'ant-design-vue';
import { useForm } from 'ant-design-vue/lib/form';
import { defineComponent, PropType, reactive, watch } from 'vue';
import SchemaFormItem from './schema-form-item';

export type SchemaFormItemSettingType<T extends {} = {}> = {
  /**
   * 控件类型
   */
  controlType: 'Input' | 'InputNumber' | 'Textarea' | 'Button';
  /**
   * key v-model
   */
  keyId: keyof T;
  /**
   * 默认同keyId
   */
  rulesKey?: keyof T & string;
  /**
   * 其他属性 解构使用 用于form-item
   */
  propertyObject?: InputNumberProps;
  /**
   * controler property  例如：onChange=()=>{}
   */
  controlPropery?: Maybe<any>;
  /**
   * 显示文本
   */
  label?: string;
  /**
   * default 默认同 keyId
   */
  controlName?: string;
};

export type SchemaFType<T extends {} = {}> = {
  /**
   * 表单名称
   */
  formName: string;
  /**
   * 初始化对象
   */
  initValue?: T;
  /**
   * rule
   */
  ruleRefs: {
    [k in keyof T]?: Array<{}>;
  };
  /**
   * 表单项目
   */
  formItems: Array<SchemaFormItemSettingType<T>>;
  /**
   * 是否自动完成 default off
   */
  autocomplete?: 'off' | 'on';
  /**
   * default 8
   */
  labelColSpan?: number;
  /**
   * default 16
   */
  wrapperColSpan?: number;
  /**
   * 提交表单且数据验证成功后回调事件
   */
  handleFinish?: (values: T) => any;
  /**
   * 提交表单且数据验证失败后回调事件
   */
  handleFinishFailed?: (errorInfo: any) => any;
};

export type SchemaFormPropsType = {
  shema: SchemaFType;
};

/**
 * schema to form
 * 根据schema生成form表单
 * @returns
 */
const SchemaForm = defineComponent({
  props: {
    modelValue: Object,
    schema: { type: Object as PropType<SchemaFType>, required: true },
  },
  setup(props, { emit }) {
    // useForm
    // form model
    const formValue = reactive(props.schema.initValue || {});
    const ruleRefs = reactive(props.schema.ruleRefs);
    const from = useForm(formValue, ruleRefs);
    const { validate, validateInfos } = from;

    watch(formValue, () => {
      emit('modelValue', formValue);
    });

    return () => (
      <Form
        name={props.schema.formName}
        label-col={{ span: props.schema.labelColSpan || 8 }}
        wrapper-col={{ span: props.schema.wrapperColSpan || 16 }}
        onFinish={props.schema.handleFinish}
        onFinishFailed={props.schema.handleFinishFailed}
      >
        {props.schema.formItems.map((p) => (
          <SchemaFormItem
            item={p}
            rules={validateInfos[p.rulesKey || p.keyId]}
            v-model={formValue[p.keyId]}
          ></SchemaFormItem>
        ))}
      </Form>
    );
  },
});
export type SchemaFormType = typeof SchemaForm;
export default SchemaForm;
