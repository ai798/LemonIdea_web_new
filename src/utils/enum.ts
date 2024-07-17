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
	lemon8_headline_generator = 'lemonaidea_title_imitation',
	lemon8_caption_generator = 'lemonaidea_text_imitation',
	lemon8_headline_rewriter = 'lemonaidea_title_improve',
	lemon8_caption_rewriter = 'lemonaidea_text_improve',
}
