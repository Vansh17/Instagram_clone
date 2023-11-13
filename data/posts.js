import { USERS } from "./users";

export const POSTS=[

    {
        imageUrl:'https://english.mathrubhumi.com/image/contentid/policy:1.6254431:1644399708/image.jpg?$p=0f6e831&&q=0.8',
        user:USERS[0].user,
        likes: 7870,
        caption:'Hello Alia Bhat genius of the year.',
        profile_picture: USERS[0].image,
        comments:[
            {
                user:'varun',
                comment:'President of India',
            },
            {
                user:'ranbir',
                comment:'@varun sambhalke biwi hai meri',
            },
        ],
    },
    {
        imageUrl:'https://parade.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTc4NzcwMDEwOTczMzA5/tom-cruise-net-worth.jpg',
        user: USERS[4].user,
        likes: 7870,
        caption:'My mission impossible stunt is best.',
        profile_picture: USERS[4].image,
        comments:[
            {
                user:'Definite',
                comment:'Sike I did it better',
            },
            {
                user:'Varunardo di caprio',
                comment:'I will go down as the best actor',
            },
        ],
    },
]