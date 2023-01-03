/* eslint-disable prettier/prettier */
import { translate } from './localizationHelper'

const mapTypeToTranslation = [
  {
    type: 'number',
    titleText: 'Ajv-typeNumber'
  },
  {
    type: 'integer',
    titleText: 'Ajv-typeInteger'
  },
  {
    type: 'string',
    titleText: 'Ajv-typeString'
  },
  {
    type: 'boolean',
    titleText: 'Ajv-typeBoolean'
  },
  {
    type: 'array',
    titleText: 'Ajv-typeArray'
  },
  {
    type: 'object',
    titleText: 'Ajv-typeObject'
  },
  {
    type: 'null',
    titleText: 'Ajv-typeNull'
  }
]

export function ajvLocalize(errors: any) {
  console.log('ajvLocalize-errors: ', errors)
  if (!(errors && errors.length)) {
    return
  }
  for (const e of errors) {
    let out
    let cond
    let n
    switch (e.keyword) {
      case 'additionalItems':
      case 'items':
        out = ''
        n = e.params.limit
        out += translate('Ajv-mustNotHaveMoreThan') + n + translate('Ajv-item')
        if (n !== 1) {
          out += translate('Ajv-itemPlural')
        }
        break
      case 'additionalProperties':
        out = translate('Ajv-mustNotHaveAdditionalProperties')
        break
      case 'anyOf':
        out = translate('Ajv-mustMatchASchemaInAnyOf')
        break
      case 'const':
        out = translate('Ajv-mustBeEqualToConstant')
        break
      case 'contains':
        out = translate('Ajv-mustContainValidItem')
        break
      case 'dependencies':
      case 'dependentRequired':
        out = ''
        n = e.params.depsCount
        out += translate('Ajv-mustHaveProperty')
        if (n === 1) {
          out += translate('Ajv-propertyPlural1')
        } else {
          out += translate('Ajv-propertyPlural2')
        }
        out +=
          ' ' +
          e.params.deps +
          translate('Ajv-whenProperty') +
          e.params.property +
          translate('Ajv-isPresent')
        break
      case 'discriminator':
        switch (e.params.error) {
          case 'tag':
            out =
              translate('Ajv-tag') +
              e.params.tag +
              translate('Ajv-tag_mustBeString')
            break
          case 'mapping':
            out =
              translate('Ajv-mapping_valueOfTag') +
              e.params.tag +
              translate('Ajv-mapping_mustBeInOneOf')
            break
          default:
            out =
              translate('Ajv-discriminator_mustPass') +
              e.keyword +
              translate('Ajv-discriminator_keywordValidation')
        }
        break
      case 'enum':
        out = translate('Ajv-enumMustBeEqualToOneAllowedValues')
        break
      case 'false schema':
        out = translate('Ajv-falseSchema_MustBeEqualToAllowedValues')
        break
      case 'format':
        out = translate('Ajv-mustMatchFormat') + e.params.format + '"'
        break
      case 'formatMaximum':
      case 'formatExclusiveMaximum':
        out = ''
        cond = e.params.comparison + ' ' + e.params.limit
        out += translate('Ajv-mustBe') + cond
        break
      case 'formatMinimum':
      case 'formatExclusiveMinimum':
        out = ''
        cond = e.params.comparison + ' ' + e.params.limit
        out += translate('Ajv-mustBe') + cond
        break
      case 'if':
        out =
          translate('Ajv-if_mustMatch') +
          e.params.failingKeyword +
          translate('Ajv-if_schema')
        break
      case 'maximum':
      case 'exclusiveMaximum':
        out = ''
        cond = e.params.comparison + ' ' + e.params.limit
        out += translate('Ajv-mustBe') + cond
        break
      case 'maxItems':
        out = ''
        n = e.params.limit
        out +=
          translate('Ajv-maxItems_mustNotHaveMoreThan') +
          n +
          translate('Ajv-maxItems_item')
        if (n != 1) {
          out += translate('Ajv-itemPlural')
        }
        break
      case 'maxLength':
        out = ''
        n = e.params.limit
        out +=
          translate('Ajv-mustNotBeLongerThan') + n + translate('Ajv-character')
        if (n !== 1) {
          out += translate('Ajv-characterPlural')
        }
        break
      case 'maxProperties':
        out = ''
        n = e.params.limit
        out +=
          translate('Ajv-maxItems_mustNotHaveMoreThan') +
          n +
          translate('Ajv-minProperties_property')
        if (n === 1) {
          out += translate('Ajv-propertyPlural1')
        } else {
          out += translate('Ajv-propertyPlural2')
        }
        break
      case 'minimum':
      case 'exclusiveMinimum':
        out = ''
        cond = e.params.comparison + ' ' + e.params.limit
        out += translate('Ajv-typeMustBe') + cond
        break
      case 'minItems':
        out = ''
        n = e.params.limit
        out += translate('Ajv-mustNotHaveLessThan') + n + translate('Ajv-item')
        if (n !== 1) {
          out += translate('Ajv-itemPlural')
        }
        break
      case 'minLength':
        out = ''
        n = e.params.limit
        out +=
          translate('Ajv-mustNotBeShorterThan') + n + translate('Ajv-character')
        if (n !== 1) {
          out += translate('Ajv-characterPlural')
        }
        break
      case 'minProperties':
        out = ''
        n = e.params.limit
        out +=
          translate('Ajv-mustNotHaveLessThan') +
          n +
          translate('Ajv-minProperties_property')
        if (n === 1) {
          out += translate('Ajv-propertyPlural1')
        } else {
          out += translate('Ajv-propertyPlural2')
        }
        break
      case 'multipleOf':
        out = translate('Ajv-multipleOf') + e.params.multipleOf
        break
      case 'not':
        out = translate('Ajv-mustNotBeValidAccordingToSchemaNot')
        break
      case 'oneOf':
        out = translate('Ajv-mustMatchExactlyOneSchemaOneOf')
        break
      case 'pattern':
        out = translate('Ajv-mustMatchPattern') + e.params.pattern + '"'
        break
      case 'patternRequired':
        out =
          translate('Ajv-mustHavePropertyMatchingPattern') +
          e.params.missingPattern +
          '"'
        break
      case 'propertyNames':
        out = translate('Ajv-propertyNameIsInvalid')
        break
      case 'required':
        out = translate('Ajv-mustHaveRequiredProperty') // + e.params.missingProperty;
        break
      case 'type':
        out =
          translate('Ajv-typeMustBe') +
          translate(
            mapTypeToTranslation.filter((x) => x.type === e.params.type)[0]
              .titleText
          )
        break
      case 'unevaluatedItems':
        out = ''
        n = e.params.len
        out += translate('Ajv-mustNotHaveMoreThan') + n + translate('Ajv-item')
        if (n !== 1) {
          out += translate('Ajv-itemPlural')
        }
        break
      case 'unevaluatedProperties':
        out = translate('Ajv-unevaluatedProperties')
        break
      case 'uniqueItems':
        out =
          translate('Ajv-uniqueItems_mustNotHaveDuplicateItems') +
          e.params.j +
          translate('Ajv-uniqueItems_and') +
          e.params.i +
          translate('Ajv-uniqueItems_areIdentical')
        break
      default:
        out =
          translate('Ajv-discriminator_mustPass') +
          e.keyword +
          translate('Ajv-discriminator_keywordValidation')
    }
    e.message = out
  }
}
