import { Maybe } from '@/utils/ts-helper';
import { Input, FormItem } from 'ant-design-vue';
import { ValidateInfo } from 'ant-design-vue/lib/form/useForm';
import { defineComponent, h, PropType, toRefs, watch } from 'vue';
import type { SchemaFormItemSettingType } from './schema-form';

export type SchemaFormItemPropsType = {};

/**
 * item 控件处理
 * @returns
 */
const SchemaFormItem = defineComponent({
  props: {
    modelValue: Object,
    item: { type: Object as PropType<SchemaFormItemSettingType>, required: true },
    rules: Array as PropType<Maybe<ValidateInfo>>,
  },
  setup(props, { emit }) {
    const { item, rules, modelValue } = toRefs(props);
    watch(modelValue, () => {
      emit('update:modelValue', modelValue);
    });
    if (item.value?.controlType === 'Input') {
      // return () =>
      //   h(
      //     FormItem,
      //     {
      //       label: item.value.label,
      //       name: item.value.controlName,
      //       rules: rules,
      //       ...item.value.propertyObject,
      //     },
      //     h(Input, {
      //       modelValue: modelValue.value,
      //     })
      //   );
      return () => (
        <FormItem
          label={item.value.label}
          name={item.value.controlName || item.value.keyId}
          rules={rules}
          {...item.value.propertyObject}
        >
          <Input v-model={[modelValue.value, 'value']} {...item.value.controlPropery}></Input>
        </FormItem>
      );
    }
    return () => <div>Hello,index</div>;
  },
});
export type SchemaFormItemType = typeof SchemaFormItem;
export default SchemaFormItem;
