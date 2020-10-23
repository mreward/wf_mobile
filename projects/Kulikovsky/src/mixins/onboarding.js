import imgIntro1 from '_SRC_IMG_WALLET/resources/intro-1.svg'
import imgIntro2 from '_SRC_IMG_WALLET/resources/intro-2.svg'
import imgIntro3 from '_SRC_IMG_WALLET/resources/intro-3.svg'

export default {
    data: () => ({
        items: [
            {

                text: 'm_project_intro_text_show_qr_code',
                title: 'm_project_intro_title_bonus_card',
                imgAndroid: imgIntro1,
                imgIos: imgIntro1,
                imgPosition: 'center',
                background: 'linear-gradient(-180deg, #804696, #542F7A)'
            }, {

                text: 'm_project_intro_text_be_first_to_know',
                title: 'm_project_intro_title_actual_promotions',
                imgAndroid: imgIntro2,
                imgIos: imgIntro2,
                imgPosition: 'center',
                background: 'linear-gradient(-180deg, #804696, #542F7A)'
            }, {

                text: 'm_project_intro_text_find_information_easily',
                title: 'm_project_intro_title_company_stores',
                imgAndroid: imgIntro3,
                imgIos: imgIntro3,
                imgPosition: 'center',
                background: 'linear-gradient(-180deg, #804696, #542F7A)'
            }
        ]
    })

}
