/*
 * @Author: shy1118
 * @Date: 2023-11-18 21:35:08
 * @LastEditors: shy1118
 * @LastEditTime: 2023-11-18 21:42:31
 * @Description: eslint config
 */
// eslint.config.js
import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu(
  {},
  unocss.configs.flat,
)
