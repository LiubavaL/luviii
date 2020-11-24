export default class DummyApiService {
    getPosts(){
        const posts = [
            {
                id: 345,
                imgs: 'images/Daviot.png',
                views: 12,
                date: '2 days ago'
            },
            {
                id: 566,
                title: 'New merch',
                text: 'I\'ve added new t-shirts and caps, go and see \'em!',
                imgs: [
                    'images/happyNY.png',
                    'images/hentaiboyzz.png'
                ],
                views: 124,
                date: 'a day ago'
            },
            {
                id: 7,
                title: 'Comic Con',
                text: 'It looks like the printed version (and PDF) will be available May-ish, based on the delivery times of the printer!(If you don\'t feel like waiting, all of Pain Killer + extras are available to see on the $10 tier:',
                imgs: 'images/micocosmos.png',
                views: 14,
                date: 'a day ago'
            },
            {
                id: 4,
                title: 'Prints',
                text: 'It looks like the printed version (and PDF) will be available May-ish, based on the delivery times of the printer!(If you don\'t feel like waiting, all of Pain Killer + extras are available to see on the $10 tier:',
                imgs: 'images/hentaiboyzz.png',
                views: 34,
                date: '5 days ago'
            },
            {
                id: 36,
                title: 'Yay!',
                text: '(I bought a lot of bulk items with reusable bags: beans, rice, oatmeal, and lentils. All shelf-stable, affordable, and vegan',
                imgs: 'images/red.png',
                views: 124,
                date: 'a week ago'
            },
            {
                id: 22,
                title: 'Hey there!💡',
                text: 'In case you haven\'t heard, I opened a Patreon account!',
                imgs: 'images/Daviot.png',
                views: 12,
                date: '2 days ago'
            },
            {
                id: 12,
                title: 'New merch',
                text: 'I\'ve added new t-shirts and caps, go and see \'em!',
                imgs: [
                    'images/happyNY.png',
                    'images/hentaiboyzz.png'
                ],
                views: 124,
                date: 'a day ago'
            },
            {
                id: 77,
                title: 'Comic Con',
                text: 'It looks like the printed version (and PDF) will be available May-ish, based on the delivery times of the printer!(If you don\'t feel like waiting, all of Pain Killer + extras are available to see on the $10 tier:',
                imgs: 'images/microcosmos.png',
                views: 14,
                date: 'a day ago'
            },
            {
                id: 4,
                title: 'Prints',
                text: 'It looks like the printed version (and PDF) will be available May-ish, based on the delivery times of the printer!(If you don\'t feel like waiting, all of Pain Killer + extras are available to see on the $10 tier:',
                imgs: 'images/hentaiboyzz.png',
                views: 34,
                date: '5 days ago'
            },
            {
                id: 86,
                title: 'Yay!',
                text: '(I bought a lot of bulk items with reusable bags: beans, rice, oatmeal, and lentils. All shelf-stable, affordable, and vegan',
                imgs: 'images/red.png',
                views: 124,
                date: 'a week ago'
            },
            {
                id: 6,
                title: 'New merch',
                text: 'I\'ve added new t-shirts and caps, go and see \'em!',
                imgs: [
                    'images/happyNY.png',
                    'images/hentaiboyzz.png'
                ],
                views: 124,
                date: 'a day ago'
            },
            {
                id: 72,
                title: 'Comic Con',
                text: 'It looks like the printed version (and PDF) will be available May-ish, based on the delivery times of the printer!(If you don\'t feel like waiting, all of Pain Killer + extras are available to see on the $10 tier:',
                imgs: 'images/microcosmos.png',
                views: 14,
                date: 'a day ago'
            },
            {
                id: 14,
                title: 'Prints',
                text: 'It looks like the printed version (and PDF) will be available May-ish, based on the delivery times of the printer!(If you don\'t feel like waiting, all of Pain Killer + extras are available to see on the $10 tier:',
                imgs: 'images/hentaiboyzz.png',
                views: 34,
                date: '5 days ago'
            },
            {
                id: 56,
                title: 'Yay!',
                text: '(I bought a lot of bulk items with reusable bags: beans, rice, oatmeal, and lentils. All shelf-stable, affordable, and vegan',
                imgs: 'images/red.png',
                views: 124,
                date: 'a week ago'
            },
            {
                id: 72,
                title: 'Hey there!💡',
                text: 'In case you haven\'t heard, I opened a Patreon account!',
                imgs: 'images/Daviot.png',
                views: 12,
                date: '2 days ago'
            },
            {
                id: 22,
                title: 'New merch',
                text: 'I\'ve added new t-shirts and caps, go and see \'em!',
                imgs: [
                    'images/happyNY.png',
                    'images/hentaiboyzz.png'
                ],
                views: 124,
                date: 'a day ago'
            },
            {
                id: 97,
                title: 'Comic Con',
                text: 'It looks like the printed version (and PDF) will be available May-ish, based on the delivery times of the printer!(If you don\'t feel like waiting, all of Pain Killer + extras are available to see on the $10 tier:',
                imgs: 'images/microcosmos.png',
                views: 14,
                date: 'a day ago'
            },
            {
                id: 47,
                title: 'Prints',
                text: 'It looks like the printed version (and PDF) will be available May-ish, based on the delivery times of the printer!(If you don\'t feel like waiting, all of Pain Killer + extras are available to see on the $10 tier:',
                imgs: 'images/hentaiboyzz.png',
                views: 34,
                date: '5 days ago'
            },
            {
                id: 80,
                title: 'Yay!',
                text: '(I bought a lot of bulk items with reusable bags: beans, rice, oatmeal, and lentils. All shelf-stable, affordable, and vegan',
                imgs: 'images/rd.png',
                views: 124,
                date: 'a week ago'
            }
        ];

        return new Promise(function(res, rej){
            const time = Math.floor(Math.random() * 2000 + 1000);

            setTimeout(function(){
                //случайно выдавать ошибку для неокторых запрсов на картинки
                // if(time < 1800) {
                //     return rej(new Error('Error occured while loading illustration!'));
                // }

                return res(posts);
            }, time);
        });
    }

    getQuestions(){
        const questions = [
            {
                title: 'What tablet do you use?',
                content: "I use Wacom Cintiq Pro 16. A more affordable pen Display with Wacom Pro Pen 2 technology, 8,192 pressure levels and tilt recognition; It's amazing precision and reduced Parallax provide the most natural drawing experienceCintiq’s 15.6 inch 1920x1080 HD display provides you with clarity to see every detail of your work; The scratch resistant Anti Glare surface prevents distracting reflections as you create.See your creations in vibrant color on the Cintiq’s HD display (16.7 million colors Bit, 72 percentage NTSC/Cie1931 typical) ); Work as long as you'd like with the battery free pen that charges off the screen while you create. Connect to your computer with the convenient 3 in 1 (HDMI) connection cable and get into the perfect position with foldable legs that let you adjust how you want to work; Brightness 250 cd/m2. Warning: Manufacturer's warranty is only valid when purchased from an authorized reseller or Amazon.com"
            },
            {
                title: 'Can I use your art in my blog/avatar/etc?',
                content: 'Only non-commercial use is allowed. If you want to use my art, please ask me first. Usually I allow people use my works. Please, don\'t repost my works without credits, sell or edit. Thank you!'
            },
            {
                title: 'Where can I buy merch with your art?',
                content: 'Online shop is in development process now and will be available soon!'
            }
        ];

        return new Promise((res, rej) => {
            setTimeout(() => res(questions), 2500);
        });
    }

    getChapters(){
        const chapters = [
            {
                id: 1,
                title: "September and part. My One And Only Love (The End)",
                index: "01",
                date: "7 Jul, 2019",
                cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Figure_in_Manga_style.png/1200px-Figure_in_Manga_style.png"
            },
            {
                id: 2,
                title: " and part. My One And Only Love (The End) and part. My One And Only Love (The End) and part. My One And Only Love (The End) and part. My One And Only Love (The End)September and part. My One And Only Love (The End)",
                index: "02",
                date: "7 Jul, 2019",
                cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Figure_in_Manga_style.png/1200px-Figure_in_Manga_style.png"
            },
            {
                id: 3,
                isNew: "true",
                title: "September and part. My One And Only Love (The End)",
                index: "03",
                date: "7 Jul, 2019",
                cover: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Figure_in_Manga_style.png/1200px-Figure_in_Manga_style.png"
            }
        ];

        return new Promise((res, rej) => {
            setTimeout(() => res(chapters), 5000);
        });
    }
}