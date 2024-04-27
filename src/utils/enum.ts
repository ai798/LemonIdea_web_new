//"01" 生成标题 "02" 生成文本 "03" 优化标题 "04" 优化文本
//"10" 反馈
export enum FunctionType {
  TITLE_PARA = '01',
  TITLE_OPT = '03',
  BODY_PARA = '02',
  BODY_OPT = '04',
  FEEDBACK = '10',
}

export enum OptionsType {
  title_paraphrasing = "lemonaidea_title_imitation",
  bodyText_paraphrasing = "lemonaidea_text_imitation",
  title_optimization = "lemonaidea_title_improve",
  bodyText_optimization = "lemonaidea_text_improve"
}