import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  Home, Users, Mail, Phone as PhoneIcon, DollarSign, Repeat, UserPlus,
  ChevronRight, ChevronDown, Search, PartyPopper, TrendingUp, CalendarClock,
  X, ArrowUpRight, MapPin, Megaphone, Share2, Sparkles, Star,
  Target, Plus, Building2, Trophy, Clock, Trash2, Percent, Flame, MessageSquare
} from 'lucide-react';

// Frozen historical baseline — sources that will never receive new form submissions
const STATIC_ORDERS = [{"id":58,"k":"(801) 598-0402","name":"Tiffany Colaizzi","phone":"(801) 598-0402","email":"tiffcolaizzi@msn.com","addr":"","date":"2022-08-07","occ":"Baby Shower","pkg":"Organic Garland at $20 a foot (10 foot minimum)","val":200.0,"lead":"Unknown","ref":"","year":2022,"ts":"2022-07-22T22:36:04.370000"},{"id":59,"k":"(949) 395-7914","name":"Jamie Parnell","phone":"(949) 395-7914","email":"Jmparnell@att.net","addr":"","date":"2022-08-06","occ":"Special Occasion","pkg":"Organic Garland at $20 a foot (10 foot minimum)","val":200.0,"lead":"Unknown","ref":"","year":2022,"ts":"2022-07-28T16:39:57.387000"},{"id":60,"k":"(714) 318-7027","name":"Beth Sullivan","phone":"(714) 318-7027","email":"Quinlan.beth@gmail.com","addr":"","date":"2022-10-15","occ":"Birthday","pkg":"Porch POP! $100","val":100.0,"lead":"Unknown","ref":"","year":2022,"ts":"2022-08-20T11:58:57.951000"},{"id":61,"k":"(512) 595-4701","name":"Nikki Harrison","phone":"(512) 595-4701","email":"snharrison421@gmail.com","addr":"","date":"2022-09-04","occ":"Birthday","pkg":"Special Occasion Package $285","val":285.0,"lead":"Unknown","ref":"","year":2022,"ts":"2022-08-25T09:20:44.711000"},{"id":62,"k":"(737) 230-2306","name":"Tasha","phone":"(737) 230-2306","email":"","addr":"","date":"2022-08-27","occ":"Unspecified","pkg":"","val":0,"lead":"Unknown","ref":"","year":2022,"ts":null},{"id":63,"k":"(704) 917-8858","name":"Chandu & Sravaniy","phone":"(704) 917-8858","email":"chanduk18@gmail.com","addr":"","date":"2022-09-02","occ":"Special Occasion","pkg":"Garland and Tree with custom lettering \"Welcome to Arav's Splish Splash Birthday\"","val":0,"lead":"Unknown","ref":"","year":2022,"ts":null},{"id":64,"k":"(432) 234-3080","name":"Ellie Torres","phone":"(432) 234-3080","email":"ellietorres115@gmail.com","addr":"","date":"2022-09-04","occ":"Baby Shower","pkg":"Cocoa, Lace, Blush 10' garland and 3' cluster","val":0,"lead":"Unknown","ref":"","year":2022,"ts":null},{"id":65,"k":"kelsey.oliver@ef.com","name":"EF Display","phone":"","email":"kelsey.oliver@ef.com","addr":"","date":"2022-09-08","occ":"Unspecified","pkg":"","val":0,"lead":"Unknown","ref":"","year":2022,"ts":null},{"id":66,"k":"(512) 914-2908","name":"Kelly Blank","phone":"(512) 914-2908","email":"kellie@kdmcaustin.com","addr":"","date":null,"occ":"Special Occasion","pkg":"Orange, White balloons white strings. 8 bunches 9/28, 4 bunches of lime green and black 9/30","val":0,"lead":"Unknown","ref":"","year":null,"ts":null},{"id":67,"k":"vgonzalez@ecprtexas.com","name":"Victoria Gonzalez","phone":"","email":"vgonzalez@ecprtexas.com","addr":"","date":"2022-09-30","occ":"Special Occasion","pkg":"Giant Square Arch Navy, White, Gold accents","val":0,"lead":"Unknown","ref":"","year":2022,"ts":null},{"id":68,"k":"(908) 499-3572","name":"Dounia Chadili","phone":"(908) 499-3572","email":"douniachadili@gmail.com","addr":"","date":"2022-10-22","occ":"Birthday","pkg":"Porch POP! $100","val":100.0,"lead":"Unknown","ref":"","year":2022,"ts":"2022-09-25T17:46:57.643000"},{"id":69,"k":"(949) 870-2302","name":"Amy Huff","phone":"(949) 870-2302","email":"Amyhuff20@yahoo.com","addr":"","date":"2022-10-15","occ":"Birthday","pkg":"Infinity Circle Arch $400 (base)","val":400.0,"lead":"Unknown","ref":"","year":2022,"ts":"2022-09-27T22:32:40.682000"},{"id":70,"k":"(254) 709-2488","name":"Amy Keel","phone":"(254) 709-2488","email":"Amymkeel@gmail.com","addr":"","date":"2022-10-09","occ":"Birthday","pkg":"Porch POP! $100","val":100.0,"lead":"Unknown","ref":"","year":2022,"ts":"2022-10-01T13:43:32.310000"},{"id":71,"k":"(254) 709-2488","name":"Amy Keel","phone":"(254) 709-2488","email":"Amymkeel@gmail.com","addr":"","date":"2022-10-20","occ":"Birthday","pkg":"Porch POP! $100","val":100.0,"lead":"Unknown","ref":"","year":2022,"ts":"2022-10-01T13:47:51.044000"},{"id":72,"k":"(254) 709-2488","name":"Amy Keel","phone":"(254) 709-2488","email":"Amymkeel@gmail.com","addr":"","date":"2022-10-22","occ":"Birthday","pkg":"Porch POP! $100","val":100.0,"lead":"Unknown","ref":"","year":2022,"ts":"2022-10-01T13:52:57.795000"},{"id":73,"k":"(949) 290-2550","name":"Kristen Kang","phone":"(949) 290-2550","email":"kkang@inpowerglobal.com","addr":"","date":"2022-10-13","occ":"Wedding/Engagement","pkg":"Special Occasion Package $285","val":285.0,"lead":"Unknown","ref":"","year":2022,"ts":"2022-10-03T19:03:10.777000"},{"id":74,"k":"(949) 331-2832","name":"Anne Chung","phone":"(949) 331-2832","email":"anne91701@yahoo.com","addr":"","date":"2022-11-17","occ":"School/Team Event","pkg":"Giant Square Arch $500 (base), Fancy Balloon Trees $165 Each (minimum of 2)","val":665.0,"lead":"Unknown","ref":"","year":2022,"ts":"2022-10-12T20:56:54.189000"},{"id":75,"k":"(949) 228-2176","name":"Valerie Grombchevsky","phone":"(949) 228-2176","email":"valt13@hotmail.com","addr":"","date":"2022-10-28","occ":"School/Team Event","pkg":"Porch POP! $100","val":100.0,"lead":"Unknown","ref":"","year":2022,"ts":"2022-10-17T13:04:23.859000"},{"id":76,"k":"(254) 709-2488","name":"Amy","phone":"(254) 709-2488","email":"Amymkeel@gmail.com","addr":"","date":"2022-10-24","occ":"Birthday","pkg":"Porch POP! $100","val":100.0,"lead":"Unknown","ref":"","year":2022,"ts":"2022-10-19T22:32:19.224000"},{"id":77,"k":"(949) 456-5627","name":"Shannon","phone":"(949) 456-5627","email":"smsetter@yahoo.com","addr":"Pump it Up, Lake Forest: 26242 Dimension, Lake Forest CA (949) 951-9663","date":"2022-12-02","occ":"Birthday","pkg":"Porch POP! $150, Balloon Clusters $65 each (order must total $100 minimum for delivery)","val":215.0,"lead":"Unknown","ref":"","year":2022,"ts":"2022-11-18T14:53:43.047000"},{"id":78,"k":"(312) 286-7437","name":"Julie Lehnis","phone":"(312) 286-7437","email":"julie.lehnis@gmail.com","addr":"","date":"2022-12-01","occ":"Baby Shower","pkg":"Balloon Clusters $65 each (order must total $100 minimum for delivery)","val":65.0,"lead":"Unknown","ref":"","year":2022,"ts":"2022-11-29T12:24:24.281000"},{"id":79,"k":"(562) 639-1015","name":"Breanne","phone":"(562) 639-1015","email":"bmacfarland10@gmail.com","addr":"","date":"2023-01-28","occ":"Birthday","pkg":"Special Occasion Package $350","val":350.0,"lead":"Unknown","ref":"","year":2023,"ts":"2022-12-22T14:28:54.581000"},{"id":80,"k":"diana.miletich@att.net","name":"Diana Miletich","phone":"","email":"diana.miletich@att.net","addr":"","date":"2022-11-20","occ":"Special Occasion","pkg":"Special Occasion Plus table centerpieces","val":0,"lead":"Unknown","ref":"","year":2022,"ts":null},{"id":81,"k":"name:chandra moschina","name":"Chandra Moschina","phone":"","email":"","addr":"Shooooowwww","date":"2020-05-31","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-05-27T21:29:16.606000"},{"id":82,"k":"name:justin","name":"Justin","phone":"","email":"","addr":"None","date":"2020-06-06","occ":"Birthday","pkg":"Special Occasion Garland Package - $165","val":165.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-05-27T21:54:17.917000"},{"id":83,"k":"name:chandra moschina","name":"Chandra Moschina","phone":"","email":"","addr":"Shooooowwww","date":"2020-05-31","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-05-28T11:58:02.916000"},{"id":84,"k":"name:melissa kruger","name":"Melissa Kruger","phone":"","email":"","addr":"I\u2019d like to do a balloon arch like you did for the Cordova\u2019s.  I\u2019d also like the 2020 mylars filled ","date":"2020-06-06","occ":"Graduation","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-05-28T13:30:59.136000"},{"id":85,"k":"name:kelly lambdin","name":"KELLY LAMBDIN","phone":"","email":"","addr":"Could I also have some balloons for inside the house.  Also, the names on the balloons at the top of","date":"2020-05-31","occ":"Graduation","pkg":"Two Tower Package - $125","val":125.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-05-28T18:54:14.101000"},{"id":86,"k":"name:sian garcia parsons","name":"Sian Garcia Parsons","phone":"","email":"","addr":"I would prefer just one Stack with the number 9 on the top. Let me know if you can do that.","date":"2020-06-20","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-05-28T20:17:42.694000"},{"id":87,"k":"name:test","name":"Test","phone":"","email":"","addr":"24 via Helena RSM","date":"2020-07-12","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"Bob","year":2020,"ts":"2020-05-28T21:21:41.322000"},{"id":88,"k":"name:lauren sherwin","name":"Lauren Sherwin","phone":"","email":"","addr":"6 Claremont Lane, Coto de caza, ca 92679","date":"2020-06-02","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-05-28T21:46:52.885000"},{"id":89,"k":"name:adriane casas","name":"Adriane Casas","phone":"","email":"","addr":"25302 Rancho Niguel Road, Laguna Niguel, CA 92677","date":"2020-06-03","occ":"Graduation","pkg":"Graduation Yard - $199","val":199.0,"lead":"Referral","ref":"Caprice Cortinas","year":2020,"ts":"2020-05-28T22:52:59.545000"},{"id":90,"k":"name:april egbert","name":"April Egbert","phone":"","email":"","addr":"38 Avenida Merida, San Clemente","date":"2020-06-04","occ":"Graduation","pkg":"Graduation Yard - $199","val":199.0,"lead":"Referral","ref":"Lisa Fogarty","year":2020,"ts":"2020-05-29T17:22:09.559000"},{"id":91,"k":"(949) 285-5963","name":"nicole dunlop","phone":"(949) 285-5963","email":"","addr":"1348 skyline drive, laguna beach","date":"2020-06-01","occ":"Birthday","pkg":"Special Occasion Garland Package - $165","val":165.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-05-29T19:52:40.923000"},{"id":92,"k":"(949) 678-8506","name":"Brandy Born","phone":"(949) 678-8506","email":"","addr":"30 Sarazen Lane, Coto de Caza","date":"2020-06-05","occ":"Graduation","pkg":"Graduation Yard - $199","val":199.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-05-29T22:29:53.465000"},{"id":93,"k":"(949) 678-8506","name":"Brandy Born","phone":"(949) 678-8506","email":"","addr":"30 Sarazen lane","date":"2020-06-21","occ":"Special Occasion","pkg":"Extra Large Garland Package - $225","val":225.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-05-29T22:38:45.053000"},{"id":94,"k":"(949) 678-8506","name":"Brandy Born","phone":"(949) 678-8506","email":"","addr":"30 Sarazen Lane","date":"2020-07-04","occ":"Holiday","pkg":"Extra Large Garland Package - $225","val":225.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-05-29T22:44:20.707000"},{"id":95,"k":"(949) 678-8506","name":"Brandy Born","phone":"(949) 678-8506","email":"","addr":"30 Sarazen lane","date":"2020-07-14","occ":"Birthday","pkg":"Special Occasion Garland Package - $165","val":165.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-05-29T22:47:02.943000"},{"id":96,"k":"(949) 306-1117","name":"Paulina Bustos","phone":"(949) 306-1117","email":"","addr":"25 Calle Liberacion","date":"2020-06-02","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"Colin Brown","year":2020,"ts":"2020-05-31T17:09:25.703000"},{"id":97,"k":"(949) 500-7353","name":"Kindy","phone":"(949) 500-7353","email":"","addr":"24811 Pylos Way Mission Viejo","date":"2020-06-06","occ":"Birthday","pkg":"Special Occasion Garland Package - $165","val":165.0,"lead":"Facebook","ref":"Your secret admirer!","year":2020,"ts":"2020-06-01T12:45:47.582000"},{"id":98,"k":"(714) 260-3671","name":"Linh Tran","phone":"(714) 260-3671","email":"","addr":"10 San Ignacio","date":"2020-06-04","occ":"Special Occasion","pkg":"Graduation Yard - $199","val":199.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-06-01T16:08:39.409000"},{"id":99,"k":"(949) 272-6164","name":"Diane Abney","phone":"(949) 272-6164","email":"","addr":"410 Arenoso #301, San Clemente","date":"2020-07-01","occ":"Holiday","pkg":"Special Occasion Garland Package - $165","val":165.0,"lead":"Referral","ref":"Chandra","year":2020,"ts":"2020-06-01T16:36:02.104000"},{"id":100,"k":"(949) 267-8884","name":"Tiffany Cuthbert","phone":"(949) 267-8884","email":"","addr":"One at 21126 Briarwood Ln, Trabuco Canyon, other at nearby grassy area","date":"2020-06-11","occ":"Graduation","pkg":"Two Tower Package - $125","val":125.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-06-02T08:43:12.072000"},{"id":101,"k":"(949) 599-5589","name":"Miranda & Jenelle Perez","phone":"(949) 599-5589","email":"","addr":"26921 Safiro, Mission Viejo, CA 92691","date":"2020-06-04","occ":"Birthday","pkg":"Special Occasion Garland Package - $165","val":165.0,"lead":"Referral","ref":"Jenelle Decuir","year":2020,"ts":"2020-06-02T20:39:45.014000"},{"id":102,"k":"(714) 325-1766","name":"Dot Blanchi","phone":"(714) 325-1766","email":"","addr":"25561 La Mirada Street, Laguna Hills","date":"2020-06-08","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-06-04T11:10:05.234000"},{"id":103,"k":"(949) 444-4550","name":"Diana Weber","phone":"(949) 444-4550","email":"","addr":"8 Merriweather Place, Ladera Ranch","date":"2020-06-13","occ":"Special Occasion","pkg":"Special Occasion Garland Package - $165","val":165.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-06-04T23:28:22.497000"},{"id":104,"k":"(949) 338-7015","name":"Robyn Willett","phone":"(949) 338-7015","email":"","addr":"23964 juaneno dr mission viejo","date":"2020-06-27","occ":"Birthday","pkg":"Special Occasion Garland Package - $165","val":165.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-06-06T10:02:06.392000"},{"id":105,"k":"(949) 705-9543","name":"Cindy Duarte","phone":"(949) 705-9543","email":"","addr":"21372 Cozy Glen Trabuco Canyon","date":"2020-06-12","occ":"Graduation","pkg":"Special Occasion Garland Package - $165","val":165.0,"lead":"Facebook","ref":"i have 2 friends on i saw on facebook that used your service. Anna Baldridge and Karen DeLaura","year":2020,"ts":"2020-06-06T11:17:51.053000"},{"id":106,"k":"(714) 357-7227","name":"Jamie Born","phone":"(714) 357-7227","email":"","addr":"28060 Santona drive, RANCHO Palos Verdes 90275","date":"2020-06-11","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-06-06T19:18:17.817000"},{"id":107,"k":"(949) 742-2263","name":"Christine Arakawa","phone":"(949) 742-2263","email":"","addr":"27 Bronco Street, Trabuco Canyon, CA 92679","date":"2020-06-25","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-06-08T08:37:05.633000"},{"id":108,"k":"(949) 331-2832","name":"Anne Chung","phone":"(949) 331-2832","email":"","addr":"5 Galisteo Drive, RSM","date":"2020-07-06","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-06-08T18:11:32.504000"},{"id":109,"k":"(714) 906-4083","name":"Cecilia Alcala","phone":"(714) 906-4083","email":"","addr":"11 Heather Hill ln, laguna hills CA 92653","date":"2020-06-13","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"Client","year":2020,"ts":"2020-06-08T19:28:47.404000"},{"id":110,"k":"(949) 500-2964","name":"Natalie Boyd","phone":"(949) 500-2964","email":"","addr":"25 Flagstone, Coto","date":"2020-06-30","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-06-15T11:37:13.608000"},{"id":111,"k":"(818) 472-2251","name":"Sherry Melwani","phone":"(818) 472-2251","email":"","addr":"32 Falkner dr. Ladera ca 92694","date":"2020-06-26","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Facebook","ref":"Chandra","year":2020,"ts":"2020-06-17T09:24:08.095000"},{"id":112,"k":"(714) 461-6171","name":"Jen Park","phone":"(714) 461-6171","email":"","addr":"25091 Northrup drive, Laguna hills","date":"2020-07-11","occ":"Birthday","pkg":"Extra Large Garland Package - $225","val":225.0,"lead":"Referral","ref":"Indigo","year":2020,"ts":"2020-06-21T12:17:12.683000"},{"id":113,"k":"(949) 422-5994","name":"Amal fatehi","phone":"(949) 422-5994","email":"","addr":"24 palomino in coto","date":"2020-06-27","occ":"Birthday","pkg":"Extra Large Garland Package - $225","val":225.0,"lead":"Referral","ref":"Brandy born","year":2020,"ts":"2020-06-23T21:47:56.859000"},{"id":114,"k":"(949) 285-0207","name":"Gabriella Mastrobattista","phone":"(949) 285-0207","email":"","addr":"7 Cerro Ct., Rancho Mission Viejo, CA 92694","date":"2020-06-27","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-06-26T11:14:46.496000"},{"id":115,"k":"(714) 292-7277","name":"Lauren Giacobbe","phone":"(714) 292-7277","email":"","addr":"28 lynnfield Irvine, ca 92620","date":"2020-07-16","occ":"Birthday","pkg":"Extra Large Garland Package - $225","val":225.0,"lead":"Referral","ref":"Theresa Pollack","year":2020,"ts":"2020-06-27T18:29:07.785000"},{"id":116,"k":"(949) 482-5488","name":"Laura Breaux","phone":"(949) 482-5488","email":"","addr":"66 Springfield Mission Viejo CA 92692","date":"2020-07-02","occ":"Birthday","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Referral","ref":"Mary Daryabigi","year":2020,"ts":"2020-06-27T22:42:16.355000"},{"id":117,"k":"(949) 293-5383","name":"Shannon Byrne","phone":"(949) 293-5383","email":"","addr":"2018 Lemnos Drive","date":"2020-07-11","occ":"Birthday","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Referral","ref":"Diana Weber","year":2020,"ts":"2020-06-30T10:48:31.989000"},{"id":118,"k":"(949) 337-9556","name":"Erin Ferguson","phone":"(949) 337-9556","email":"","addr":"20 Berlamo","date":"2020-07-06","occ":"Special Occasion","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-06-30T13:57:27.875000"},{"id":119,"k":"(949) 351-1450","name":"Patrice Bradford","phone":"(949) 351-1450","email":"","addr":"29 wakonda dove canyon","date":"2020-07-04","occ":"Holiday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-06-30T18:46:11.948000"},{"id":120,"k":"(949) 382-5684","name":"Andrea DeSanto","phone":"(949) 382-5684","email":"","addr":"36 Milagro Rancho Santa margarita, CA","date":"2020-07-05","occ":"Birthday","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-06-30T18:57:07.060000"},{"id":121,"k":"(425) 290-9144","name":"KRISTINE R MUSSOLINE","phone":"(425) 290-9144","email":"","addr":"4 amantes","date":"2020-07-24","occ":"Birthday","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-07-01T08:24:57.607000"},{"id":122,"k":"(949) 291-9905","name":"Stephanie Mackie","phone":"(949) 291-9905","email":"","addr":"Trabuco Canyon","date":"2020-08-09","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-07-01T13:03:21.021000"},{"id":123,"k":"(310) 897-0998","name":"Marie Fintland","phone":"(310) 897-0998","email":"","addr":"5 Addington place Coto de Caza","date":"2020-08-04","occ":"Birthday","pkg":"Extra Large Garland Package - $225","val":225.0,"lead":"Referral","ref":"Marsi Zintel Hanna","year":2020,"ts":"2020-07-02T06:25:49.467000"},{"id":124,"k":"(858) 349-4676","name":"Leia Pedlow","phone":"(858) 349-4676","email":"","addr":"76 San Bonifacio Rancho Sta Mga","date":"2020-07-18","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"Linh Tran","year":2020,"ts":"2020-07-02T16:30:29.185000"},{"id":125,"k":"(949) 500-7353","name":"Mom","phone":"(949) 500-7353","email":"","addr":"24811 Pylos way Mission Viejo Ca 92691","date":"2020-07-13","occ":"Special Occasion","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Referral","ref":"Shay and Bella","year":2020,"ts":"2020-07-02T19:52:18.666000"},{"id":126,"k":"(949) 273-9868","name":"Brandi Buffington","phone":"(949) 273-9868","email":"","addr":"12 eastridge  coto 92679","date":"2020-07-09","occ":"Birthday","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Referral","ref":"Thanks Chan!! You are killing this :)","year":2020,"ts":"2020-07-05T14:40:39.214000"},{"id":127,"k":"(612) 581-6699","name":"Lindsay Eaton","phone":"(612) 581-6699","email":"","addr":"110 Tierra Montanosa, RSM","date":"2020-07-24","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"The fabulous Chandra Moschina! \ud83d\ude09","year":2020,"ts":"2020-07-07T12:10:00.928000"},{"id":128,"k":"(619) 846-9426","name":"Amber Costello","phone":"(619) 846-9426","email":"","addr":"4 Coluso RSM","date":"2020-07-11","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Instagram","ref":"","year":2020,"ts":"2020-07-08T09:57:00.747000"},{"id":129,"k":"(949) 521-8222","name":"Tricia Abernathy","phone":"(949) 521-8222","email":"","addr":"25381 Linda Vista Dr, Laguna Hills  , CA 92653","date":"2020-08-03","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"Dot Blanchi","year":2020,"ts":"2020-07-08T13:38:47.584000"},{"id":130,"k":"(714) 469-4742","name":"Dawn Rentrop","phone":"(714) 469-4742","email":"","addr":"53 Toulon, Foothill Ranch 92610","date":"2020-07-26","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-07-14T13:28:49.968000"},{"id":131,"k":"(949) 422-9766","name":"Rebecca Araoz","phone":"(949) 422-9766","email":"","addr":"20031 summit trail rd","date":"2020-07-19","occ":"Birthday","pkg":"Extra Large Garland Package - $275","val":275.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-07-16T11:02:40.877000"},{"id":132,"k":"(949) 280-2448","name":"Kim Houldin","phone":"(949) 280-2448","email":"","addr":"28632 Mill Pond, Mission Viejo","date":"2020-07-25","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"Chandra-creative genius\ud83d\udc97","year":2020,"ts":"2020-07-17T08:28:46.330000"},{"id":133,"k":"(949) 584-5393","name":"Joana Carvalho","phone":"(949) 584-5393","email":"","addr":"24 Santa Cruz","date":"2020-08-01","occ":"Birthday","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Referral","ref":"Kristine Mussoline","year":2020,"ts":"2020-07-25T11:03:49.169000"},{"id":134,"k":"(949) 351-1450","name":"Patrice Bradford","phone":"(949) 351-1450","email":"","addr":"29 wakonda Trabuco canyon","date":"2020-08-08","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-07-26T12:08:42.734000"},{"id":135,"k":"(520) 241-5508","name":"Michelle Marchetti","phone":"(520) 241-5508","email":"","addr":"1 Cherry Hills Dr, Coto De Caza","date":"2020-08-03","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-07-27T08:14:25.167000"},{"id":136,"k":"(714) 398-0154","name":"Morgan","phone":"(714) 398-0154","email":"","addr":"25 buckthorn RSM","date":"2020-09-26","occ":"Wedding/Engagement","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-07-28T13:17:56.655000"},{"id":137,"k":"(949) 228-3402","name":"Brianna Juel","phone":"(949) 228-3402","email":"","addr":"27001 Azul Dr","date":null,"occ":"Birthday","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Referral","ref":"Chandra!!","year":null,"ts":"2020-07-29T21:05:14.993000"},{"id":138,"k":"(949) 291-9810","name":"Jennifer","phone":"(949) 291-9810","email":"","addr":"15 Formero st, RMV","date":"2020-08-19","occ":"Birthday","pkg":"I\u2019m not sure if I selected correctly option. I want the 2 tier option with large Mylar 16 balloons","val":0,"lead":"Referral","ref":"Kristin Dennis","year":2020,"ts":"2020-08-04T11:31:49.107000"},{"id":139,"k":"(949) 351-9554","name":"Lisa Nhieu","phone":"(949) 351-9554","email":"","addr":"28 Alienta Lane , 92694","date":"2020-08-19","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-08-04T12:02:03.134000"},{"id":140,"k":"(310) 489-5751","name":"Sherin Ali","phone":"(310) 489-5751","email":"","addr":"5 Hubbard,Coto De Caza","date":"2020-08-29","occ":"Wedding/Engagement","pkg":"1/2 arch over dessert table","val":0,"lead":"Referral","ref":"","year":2020,"ts":"2020-08-10T10:39:09.175000"},{"id":141,"k":"(949) 702-3400","name":"Deja Pelayo","phone":"(949) 702-3400","email":"","addr":"10 Marchin Dr Coto de Caza 92679","date":"2020-08-30","occ":"Baby Shower","pkg":"I would like the special occasion large package but also would like the inside of the house to be decorated as well such","val":0,"lead":"Referral","ref":"traci brown","year":2020,"ts":"2020-08-10T21:25:55.549000"},{"id":142,"k":"(949) 374-3096","name":"Linzi Rios","phone":"(949) 374-3096","email":"","addr":"19 serene canyon rd","date":"2020-08-13","occ":"Graduation","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"Kelly Lambdin","year":2020,"ts":"2020-08-12T13:35:39.831000"},{"id":143,"k":"name:linzi rios","name":"Linzi Rios","phone":"","email":"","addr":"","date":"2020-08-13","occ":"Graduation","pkg":"","val":0,"lead":"Unknown","ref":"","year":2020,"ts":"2020-08-13T18:11:03.445000"},{"id":144,"k":"name:nicole daley","name":"Nicole Daley","phone":"","email":"","addr":"","date":"2020-08-22","occ":"Birthday","pkg":"","val":0,"lead":"Unknown","ref":"","year":2020,"ts":"2020-08-14T08:33:15.821000"},{"id":145,"k":"name:jenna hinze","name":"Jenna Hinze","phone":"","email":"","addr":"..26482 Paseo Toscana, SJC,92675","date":"2020-08-14","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-08-14T10:27:56.490000"},{"id":146,"k":"name:susie harrison","name":"Susie Harrison","phone":"","email":"","addr":"6451 Santa Rita Ave. Garden Grove CA 92845","date":"2020-09-19","occ":"Wedding/Engagement","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-08-16T17:43:59.479000"},{"id":147,"k":"name:test","name":"Test","phone":"","email":"","addr":"24 Via helena","date":"2020-08-17","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-08-16T17:50:42.314000"},{"id":148,"k":"(619) 846-9426","name":"Amber Costello","phone":"(619) 846-9426","email":"","addr":"4 Coluso RSM","date":"2020-08-20","occ":"Birthday","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-08-18T16:06:09.919000"},{"id":149,"k":"(213) 399-9823","name":"Richard Raine","phone":"(213) 399-9823","email":"","addr":"12411 Fielding Circle, Playa Vista, CA","date":"2020-08-25","occ":"Corporate/Organization","pkg":"Two Tower Package - $125","val":125.0,"lead":"Other","ref":"","year":2020,"ts":"2020-08-20T16:11:04.605000"},{"id":150,"k":"Text","name":"Danielle","phone":"Text","email":"","addr":"22762 Via Santa Rosa, MV, CA 92691","date":"2020-09-03","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-08-22T00:20:14.345000"},{"id":151,"k":"(714) 914-2297","name":"Vikki Cronk","phone":"(714) 914-2297","email":"","addr":"9 Homestead Dr., Trabuco Canyon, 92679","date":"2020-08-30","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-08-24T09:33:13.718000"},{"id":152,"k":"Facebook Messenger/Text","name":"Natalia Roshardt","phone":"Facebook Messenger/Text","email":"","addr":"30 Morning Glory, RSM 92688","date":"2020-10-03","occ":"Wedding/Engagement","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-08-31T09:48:30.976000"},{"id":153,"k":"(949) 929-7665","name":"Jennie Browning","phone":"(949) 929-7665","email":"","addr":"21065 Winchester Dr, Trabuco Canyon 92679","date":"2020-09-18","occ":"Birthday","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Instagram","ref":"","year":2020,"ts":"2020-09-07T20:02:25.861000"},{"id":154,"k":"(949) 933-4457","name":"Jamie Freeze","phone":"(949) 933-4457","email":"","addr":"21085 Shadow Rock Lane Trabuco Canyon 92679","date":"2020-09-10","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Instagram","ref":"","year":2020,"ts":"2020-09-08T18:05:16.103000"},{"id":155,"k":"(714) 404-8776","name":"Myriam","phone":"(714) 404-8776","email":"","addr":"25242 Arder Ct Lake Forest 92630","date":"2020-09-19","occ":"Birthday","pkg":"Single Garland for $150","val":150.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-09-14T21:09:13.925000"},{"id":156,"k":"(503) 997-7414","name":"Trisha Coy","phone":"(503) 997-7414","email":"","addr":"24 San Bonifacio","date":"2020-10-11","occ":"Birthday","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-09-21T14:13:30.951000"},{"id":157,"k":"(949) 306-1117","name":"Paulina Bustos","phone":"(949) 306-1117","email":"","addr":"25 Calle Liberacion","date":"2020-10-25","occ":"Birthday","pkg":"Extra Large Garland Package - $275","val":275.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-09-22T10:03:18.901000"},{"id":158,"k":"(949) 521-1691","name":"Ashley Rodgers","phone":"(949) 521-1691","email":"","addr":"5816 E Indigo Ct Orange bCA 92868","date":"2020-11-28","occ":"Birthday","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Instagram","ref":"","year":2020,"ts":"2020-09-22T17:58:00.206000"},{"id":159,"k":"(714) 920-1033","name":"Sherry Santa Cruz","phone":"(714) 920-1033","email":"","addr":"17 Via Encanto","date":"2020-10-21","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-10-01T09:29:06.944000"},{"id":160,"k":"(949) 338-7015","name":"Robyn Willett","phone":"(949) 338-7015","email":"","addr":"23954 juaneno dr","date":"2020-10-24","occ":"Birthday","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-10-01T12:32:08.789000"},{"id":161,"k":"(714) 235-0621","name":"Heather Fiore","phone":"(714) 235-0621","email":"","addr":"32 La Flauta RSM 92688","date":"2020-11-03","occ":"Birthday","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Instagram","ref":"","year":2020,"ts":"2020-10-02T14:59:27.603000"},{"id":162,"k":"(949) 351-1450","name":"Patrice Bradford","phone":"(949) 351-1450","email":"","addr":"29 wakonda Trabuco canyon","date":"2020-10-10","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-10-04T13:06:58.720000"},{"id":163,"k":"(949) 374-9106","name":"Nicole Arduini","phone":"(949) 374-9106","email":"","addr":"15 Via Bonita  RSM","date":"2020-10-24","occ":"Birthday","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-10-05T17:44:25.675000"},{"id":164,"k":"(949) 689-7320","name":"Krista Hagen","phone":"(949) 689-7320","email":"","addr":"15 Corn Flower St","date":"2020-10-16","occ":"Birthday","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-10-14T20:06:54.327000"},{"id":165,"k":"(949) 355-5573","name":"Jackie Bartel","phone":"(949) 355-5573","email":"","addr":"North plunge pool area in RMV","date":"2020-10-24","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-10-15T11:55:20.980000"},{"id":166,"k":"(949) 547-1085","name":"Brie Vickers","phone":"(949) 547-1085","email":"","addr":"31632 Trigo Trail, Coto de Caza","date":"2020-11-21","occ":"Special Occasion","pkg":"Special Occasion Garland Package - $185","val":185.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-10-15T12:05:43.907000"},{"id":167,"k":"(949) 633-7523","name":"Michele Brandmeier","phone":"(949) 633-7523","email":"","addr":"5 Fair Elms, Laguna Niguel, 92677","date":"2020-11-19","occ":"Birthday","pkg":"Two Tower Package - $125","val":125.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-10-18T19:05:08.031000"},{"id":168,"k":"(949) 521-3122","name":"Cynthia Arias Jewell","phone":"(949) 521-3122","email":"","addr":"22195 El Paseo Unit 110 Rancho Santa Margarita CA 92688-Hannas Restaurant","date":"2020-10-31","occ":"Birthday","pkg":"Dinner Party Package $375","val":375.0,"lead":"Other","ref":"","year":2020,"ts":"2020-10-20T14:53:40.685000"},{"id":169,"k":"(949) 697-5477","name":"Jax","phone":"(949) 697-5477","email":"","addr":"Aubergine, Rancho Mission Viejo","date":"2020-10-31","occ":"Special Occasion","pkg":"Two Tower Package - $150","val":150.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-10-23T21:13:23.179000"},{"id":170,"k":"(949) 842-2110","name":"April Egbert","phone":"(949) 842-2110","email":"","addr":"38 Avenida Merida, San Clemente","date":"2020-10-31","occ":"Birthday","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Other","ref":"","year":2020,"ts":"2020-10-29T19:20:51.947000"},{"id":171,"k":"(949) 842-2110","name":"April Egbert","phone":"(949) 842-2110","email":"","addr":"38 Avenida Merida, San Clemente","date":"2020-10-31","occ":"Birthday","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Other","ref":"","year":2020,"ts":"2020-10-30T10:39:34.439000"},{"id":172,"k":"(323) 816-5661","name":"Jenn Byrd","phone":"(323) 816-5661","email":"","addr":"8 shire, coto de caza","date":"2020-10-31","occ":"Holiday","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-10-30T17:53:59.065000"},{"id":173,"k":"(323) 816-5661","name":"Jenn Byrd","phone":"(323) 816-5661","email":"","addr":"8 shire, coto de caza","date":"2020-10-31","occ":"Holiday","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-10-30T20:08:33.344000"},{"id":174,"k":"(949) 500-9578","name":"Helen Jarnigan","phone":"(949) 500-9578","email":"","addr":"17 Heron, Lake Forest","date":"2020-11-12","occ":"Special Occasion","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-11-03T09:10:14.736000"},{"id":175,"k":"(714) 260-3671","name":"Linh Tran","phone":"(714) 260-3671","email":"","addr":"10 San Ignacio, RSM 92688","date":"2020-11-28","occ":"Birthday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-11-05T14:27:32.309000"},{"id":176,"k":"(714) 260-3671","name":"Linh Tran","phone":"(714) 260-3671","email":"","addr":"10 San Ignacio, RSM 92688","date":"2020-11-28","occ":"Birthday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-11-05T15:32:21.257000"},{"id":177,"k":"(949) 351-1450","name":"Patrice Bradford","phone":"(949) 351-1450","email":"","addr":"29 wakonda Trabuco canyon","date":"2020-12-24","occ":"Birthday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-11-05T20:48:47.297000"},{"id":178,"k":"(949) 351-1450","name":"Patrice Bradford","phone":"(949) 351-1450","email":"","addr":"29 wakonda Trabuco canyon","date":"2020-12-24","occ":"Birthday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Facebook","ref":"","year":2020,"ts":"2020-11-07T09:31:43.105000"},{"id":179,"k":"(949) 521-3122","name":"Cynthia Arias Jewell","phone":"(949) 521-3122","email":"","addr":"22195 El Paseo Unit 110 Rancho Santa Margarita CA 92688-Hannas Restaurant","date":"2020-10-31","occ":"Birthday","pkg":"Dinner Party Package $375","val":375.0,"lead":"Other","ref":"","year":2020,"ts":"2020-11-08T17:16:17.785000"},{"id":180,"k":"(310) 714-7719","name":"Will James","phone":"(310) 714-7719","email":"","addr":"26 Cascada, RSM 92688","date":"2020-11-14","occ":"Birthday","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Other","ref":"","year":2020,"ts":"2020-11-12T09:06:06.409000"},{"id":181,"k":"(949) 616-6435","name":"Jami Orlowski","phone":"(949) 616-6435","email":"","addr":"24752 Evereve Circle; Lake Forest, CA 92630","date":"2020-11-21","occ":"Birthday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-11-14T22:32:29.983000"},{"id":182,"k":"(949) 933-4457","name":"Jamie Freeze","phone":"(949) 933-4457","email":"","addr":"21085 Shadow Rock Lane, Trabuco Canyon","date":"2020-11-17","occ":"Birthday","pkg":"Garland on the Go! - $100","val":100.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-11-15T19:22:27.654000"},{"id":183,"k":"(949) 500-6953","name":"Natalie Degbor","phone":"(949) 500-6953","email":"","addr":"2 Pictor Ct, Coto de Caza","date":"2020-12-07","occ":"Birthday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-11-18T16:03:48.947000"},{"id":184,"k":"(949) 397-0799","name":"Desiree Walker","phone":"(949) 397-0799","email":"","addr":"22 Weber ln coto de Caza","date":"2020-11-19","occ":"Birthday","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Instagram","ref":"","year":2020,"ts":"2020-11-18T21:03:23.750000"},{"id":185,"k":"(949) 302-5920","name":"Angela Bench","phone":"(949) 302-5920","email":"","addr":"25291 Rockridge Rd., Laguna Hills, CA 92653","date":"2020-12-11","occ":"Holiday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-11-20T16:06:30.578000"},{"id":186,"k":"(949) 500-6953","name":"Natalie Degbor","phone":"(949) 500-6953","email":"","addr":"2 Pictor ct coto de Caza","date":"2020-12-07","occ":"Birthday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-11-24T07:59:57.982000"},{"id":187,"k":"(714) 322-0485","name":"Kathy Moussiaux","phone":"(714) 322-0485","email":"","addr":"4 Via Andorra  Coto de Caza","date":"2020-12-13","occ":"Graduation","pkg":"Graduation Package - $300","val":300.0,"lead":"Other","ref":"","year":2020,"ts":"2020-12-01T19:40:40.604000"},{"id":188,"k":"(714) 504-3183","name":"Kimi Wislocki","phone":"(714) 504-3183","email":"","addr":"19 Monticello Ln., RSM","date":"2020-12-05","occ":"Birthday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-12-01T22:44:25.044000"},{"id":189,"k":"(714) 504-3183","name":"Kimi Wislocki","phone":"(714) 504-3183","email":"","addr":"19 Monticello Ln., RSM","date":"2020-12-05","occ":"Birthday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-12-02T10:57:01.614000"},{"id":190,"k":"(714) 322-0485","name":"Kathy Moussiaux","phone":"(714) 322-0485","email":"","addr":"4 Via Andorra  Coto de Caza","date":"2020-12-13","occ":"Graduation","pkg":"Graduation Package - $300","val":300.0,"lead":"Other","ref":"","year":2020,"ts":"2020-12-03T18:52:52.107000"},{"id":191,"k":"(951) 271-0116","name":"Michelle Link","phone":"(951) 271-0116","email":"","addr":"3 Via Floria","date":"2020-12-22","occ":"Birthday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Referral","ref":"","year":2020,"ts":"2020-12-13T18:59:57.602000"},{"id":192,"k":"(323) 974-5943","name":"Arlene James","phone":"(323) 974-5943","email":"","addr":"26 Cascada RSM 92688","date":"2021-01-05","occ":"Birthday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Referral","ref":"","year":2021,"ts":"2020-12-16T12:09:21.498000"},{"id":193,"k":"(323) 974-5943","name":"Arlene James","phone":"(323) 974-5943","email":"","addr":"26 Cascada RSM 92688","date":"2021-01-05","occ":"Birthday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Referral","ref":"","year":2021,"ts":"2020-12-16T16:01:30.874000"},{"id":194,"k":"(949) 394-2894","name":"Sian Garcia Parsons","phone":"(949) 394-2894","email":"","addr":"30 Via Helena.","date":"2021-01-09","occ":"Birthday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Referral","ref":"","year":2021,"ts":"2020-12-22T18:49:47.242000"},{"id":195,"k":"(949) 395-1705","name":"Kelly Sanderson","phone":"(949) 395-1705","email":"","addr":"12 Lark Drive,  RSM 92688","date":"2021-01-12","occ":"Birthday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Referral","ref":"","year":2021,"ts":"2020-12-27T21:49:23.128000"},{"id":196,"k":"(949) 351-1450","name":"Patrice Bradford","phone":"(949) 351-1450","email":"","addr":"29 wakonda Trabuco canyon92679","date":"2021-01-10","occ":"Special Occasion","pkg":"Extra Large Garland Package - $285","val":285.0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-01-08T20:00:27.862000"},{"id":197,"k":"(949) 285-0207","name":"Gabriella Mastrobattista","phone":"(949) 285-0207","email":"","addr":"Forester Ranch Community Park","date":null,"occ":"Special Occasion","pkg":"Garland on the Go! - $100","val":100.0,"lead":"Referral","ref":"","year":null,"ts":"2021-01-19T08:03:45.394000"},{"id":198,"k":"(714) 260-3671","name":"Linh Tran","phone":"(714) 260-3671","email":"linhle54@hotmail.com","addr":"10 San Ignacio, RSM 92688","date":"2021-01-28","occ":"Birthday","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-01-23T15:13:45.669000"},{"id":199,"k":"(512) 796-7101","name":"Megan Norris","phone":"(512) 796-7101","email":"volcoord@ranchosiennapto.org","addr":"Rancho Sienna Elementary School","date":"2021-02-11","occ":"Holiday","pkg":"Extra Large Garland Package - $285","val":285.0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-01-28T17:45:39.202000"},{"id":200,"k":"(949) 246-1198","name":"Erica Rahall","phone":"(949) 246-1198","email":"erica.rahall@gmail.com","addr":"1020 Noria St, Laguna beach","date":"2021-02-28","occ":"Birthday","pkg":"Porch POP! $85","val":85.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-02-23T14:53:46.349000"},{"id":201,"k":"(314) 495-7068","name":"Shivani Patel","phone":"(314) 495-7068","email":"sbd1001@gmail.com","addr":"1701 Highland Ridge Road Georgetown TX 78628","date":"2021-03-18","occ":"Birthday","pkg":"Porch POP! $85","val":85.0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-02-25T16:43:49.636000"},{"id":202,"k":"(949) 929-7565","name":"Jennie Browning","phone":"(949) 929-7565","email":"jennieb1978@yahoo.com","addr":"Will text you. Need to look it up.","date":"2021-03-05","occ":"Birthday","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Instagram","ref":"","year":2021,"ts":"2021-02-27T10:12:52.095000"},{"id":203,"k":"(949) 678-8506","name":"Brandy Born","phone":"(949) 678-8506","email":"brandyv1@hotmail.com","addr":"43 Bogey Lane, Coto De Caza 92679","date":"2021-03-07","occ":"Birthday","pkg":"Favorite Things Birthday Package - $250","val":250.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-02-27T14:16:14.967000"},{"id":204,"k":"(323) 974-5943","name":"Arlene James","phone":"(323) 974-5943","email":"arlene.james@gmail.com","addr":"26 Cascada RSM","date":"2021-04-03","occ":"Birthday","pkg":"Porch POP! $85","val":85.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-03-01T17:34:21.850000"},{"id":205,"k":"(214) 808-8761","name":"Tracey Hang","phone":"(214) 808-8761","email":"boistorous@yahoo.com","addr":"10 San Ignacio  Rancho Santa Margarita CA 92688","date":"2021-03-11","occ":"Birthday","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-03-02T20:36:22.618000"},{"id":206,"k":"80161512648","name":"Silvia","phone":"80161512648","email":"silviabailey24@gmail.com","addr":"212 Rocky View Lane","date":"2021-03-04","occ":"Birthday","pkg":"Porch POP! $85","val":85.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-03-03T08:51:01.346000"},{"id":207,"k":"(949) 338-7015","name":"Robyn brooks","phone":"(949) 338-7015","email":"robynwillett@yahoo.com","addr":"23954 juaneno dr mission viejo ca","date":"2021-07-15","occ":"Birthday","pkg":"Favorite Things Birthday Package - $250","val":250.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-03-05T21:11:52.418000"},{"id":208,"k":"(949) 246-1198","name":"Erica Rahall","phone":"(949) 246-1198","email":"erica.rahall@gmail.com","addr":"1020 Noria St, Laguna Beach 92651","date":"2021-03-14","occ":"Birthday","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-03-06T10:47:19.800000"},{"id":209,"k":"(949) 338-7015","name":"Robyn brooks","phone":"(949) 338-7015","email":"robynwillett@yahoo.com","addr":"9 baneberry aliso viejo","date":"2021-07-31","occ":"Graduation","pkg":"Graduation Package - $300","val":300.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-03-09T14:52:07.753000"},{"id":210,"k":"(714) 883-3764","name":"Nida gazi","phone":"(714) 883-3764","email":"nidagazi@gmail.com","addr":"5895 E Camino Manzano- can you just drop it off and I\u2019ll take to the park later","date":"2021-03-12","occ":"Birthday","pkg":"Custom Order $TBD","val":0,"lead":"Referral","ref":"","year":2021,"ts":"2021-03-10T13:25:53.302000"},{"id":211,"k":"(949) 689-7320","name":"Krista Hagen","phone":"(949) 689-7320","email":"kristaruetz@gmail.com","addr":"15 Cornflower St Coto de Caza 92679","date":"2021-03-27","occ":"Birthday","pkg":"Porch POP! $85","val":85.0,"lead":"Other","ref":"","year":2021,"ts":"2021-03-14T08:04:18.174000"},{"id":212,"k":"(714) 267-1136","name":"DeeDee Harder","phone":"(714) 267-1136","email":"deondraharder@gmail.com","addr":"21667 Ocean Vista Dr. Laguna Beach","date":"2021-03-20","occ":"Birthday","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-03-15T15:51:44.395000"},{"id":213,"k":"(949) 842-0883","name":"Nikki Schreiber","phone":"(949) 842-0883","email":"jnschreiber@cox.net","addr":"1 Rolling Hills Coto de Caza 92679","date":"2021-03-27","occ":"Birthday","pkg":"Extra Large Garland Package - $285","val":285.0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-03-22T19:33:16.724000"},{"id":214,"k":"(949) 322-6052","name":"Natalia Achucarro","phone":"(949) 322-6052","email":"natiachucarro@aol.com","addr":"18 Whildwheat, Irvine CA","date":"2021-04-03","occ":"Special Occasion","pkg":"Custom Order $TBD","val":0,"lead":"Other","ref":"","year":2021,"ts":"2021-03-24T08:43:11.062000"},{"id":215,"k":"(310) 925-1429","name":"Judith Kaufman","phone":"(310) 925-1429","email":"judykaufman13@gmail.com","addr":"51 Sagitta Way","date":"2021-04-17","occ":"Special Occasion","pkg":"Custom Order $TBD","val":0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-04-01T12:27:06.672000"},{"id":216,"k":"(949) 878-0437","name":"Erin Foellmi","phone":"(949) 878-0437","email":"efoellmi@yahoo.com","addr":"30605 Avenida de Las Flores Rancho Santa Margarita, CA 92688","date":"2021-04-04","occ":"Holiday","pkg":"Favorite Things Birthday Package - $250","val":250.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-04-02T13:04:31.636000"},{"id":217,"k":"(949) 395-0518","name":"Shelly McCusker","phone":"(949) 395-0518","email":"mrsmccusker@yahoo.com","addr":"8 Las Balas RSM 92688","date":"2021-04-09","occ":"Birthday","pkg":"Porch POP! $85","val":85.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-04-07T16:33:21.605000"},{"id":218,"k":"(949) 929-7565","name":"Jennie Browning","phone":"(949) 929-7565","email":"jennieb1978@yahoo.com","addr":"21065 Winchester Dr Trabuco Canyon 92679","date":"2021-04-21","occ":"Birthday","pkg":"Porch POP! $85","val":85.0,"lead":"Other","ref":"","year":2021,"ts":"2021-04-18T21:27:14.970000"},{"id":219,"k":"lhgsbctreasure@gmail.com","name":"Brandy Tabor","phone":"","email":"lhgsbctreasure@gmail.com","addr":"Lone Star Oaks 3354 CR 236, Liberty Hill","date":"2021-04-30","occ":"Special Occasion","pkg":"Large Garland","val":0,"lead":"Unknown","ref":"","year":2021,"ts":"2021-04-04T00:00:00"},{"id":220,"k":"events@thekey2freetx.org","name":"Heather Smith","phone":"","email":"events@thekey2freetx.org","addr":"Sheraton Georgetown","date":"2021-05-01","occ":"Corporate/Organization","pkg":"Custom Order, Large Arch, 2 Columns, 6 Table Toppers","val":0,"lead":"Unknown","ref":"","year":2021,"ts":"2021-05-01T00:00:00"},{"id":221,"k":"(512) 202-2191","name":"Emily Cochran","phone":"(512) 202-2191","email":"emilyc.cochran@icloud.com","addr":"141 Ridgeview Ct.  78628","date":"2021-05-01","occ":"Birthday","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-04-13T12:46:19.660000"},{"id":222,"k":"(314) 495-7068","name":"Shivani Patel","phone":"(314) 495-7068","email":"sbd1001@gmail.com","addr":"1701 Highland Ridge Road Georgetown TX 78628","date":"2021-05-02","occ":"Birthday","pkg":"Porch POP! $85","val":85.0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-04-18T15:52:39.540000"},{"id":223,"k":"(949) 235-2156","name":"Jen Oh","phone":"(949) 235-2156","email":"ohjenoh@gmail.com","addr":"Tijeras Golf Course Patio, 29082 Tijeras Creek, RSM","date":"2021-05-08","occ":"Corporate/Organization","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-04-16T18:28:38.722000"},{"id":224,"k":"(512) 818-2390","name":"Brandy Tabor","phone":"(512) 818-2390","email":"bmtabor12@gmail.com","addr":"105 Quite Oak Cove  Liberty Hill, Tx 78642","date":"2021-05-29","occ":"Graduation","pkg":"Porch POP! $85","val":85.0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-04-19T17:45:09.491000"},{"id":225,"k":"(949) 395-1186","name":"Amanda Elhaj","phone":"(949) 395-1186","email":"amandaelhaj@gmail.com","addr":"43 Fuente, RSM 92688","date":"2021-05-25","occ":"Birthday","pkg":"Porch POP! $85","val":85.0,"lead":"Instagram","ref":"","year":2021,"ts":"2021-04-22T14:38:55.468000"},{"id":226,"k":"(512) 966-6535","name":"Jennifer Boyd","phone":"(512) 966-6535","email":"jlboyd81@gmail.com","addr":"101 Maddox Drive Georgetown TX 78628","date":"2021-06-05","occ":"Graduation","pkg":"Porch POP! $85","val":85.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-04-25T08:45:02.744000"},{"id":227,"k":"(949) 842-2110","name":"April Egbert","phone":"(949) 842-2110","email":"aegbert@firstam.com","addr":"38 Avenida Merida, San Clemente","date":"2021-05-22","occ":"Special Occasion","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Other","ref":"","year":2021,"ts":"2021-04-29T00:25:36.368000"},{"id":228,"k":"(949) 842-2110","name":"April Egbert","phone":"(949) 842-2110","email":"aegbert@firstam.com","addr":"38 Avenida Merida, San Clemente","date":"2021-06-03","occ":"Graduation","pkg":"Graduation Package - $300","val":300.0,"lead":"Other","ref":"","year":2021,"ts":"2021-04-29T00:36:12.030000"},{"id":229,"k":"(323) 974-5943","name":"Arlene James","phone":"(323) 974-5943","email":"arlene.james@gmail.com","addr":"26 Cascada RSM 92688","date":"2021-05-13","occ":"Birthday","pkg":"Porch POP! $85","val":85.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-05-01T22:40:30.762000"},{"id":230,"k":"(714) 260-3671","name":"Linh Tran","phone":"(714) 260-3671","email":"linhle54@hotmail.com","addr":"Arroyo Vista K-8 School 23371 Arroyo Vista, Rancho Santa Margarita, CA  92688,","date":"2021-05-05","occ":"Special Occasion","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-05-02T07:01:20.501000"},{"id":231,"k":"(949) 702-7028","name":"Sherri Poelstra","phone":"(949) 702-7028","email":"sherripoelstra@gmail.com","addr":"21692 Esmalte Mission Viejo 92692","date":"2021-06-05","occ":"Graduation","pkg":"Special Occasion Garland Package - $195","val":195.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-05-06T09:24:29.059000"},{"id":232,"k":"(949) 275-8080","name":"Hope Erickson","phone":"(949) 275-8080","email":"hope@lovehopestyle.com","addr":"24071 Carrillo Drive, Mission Viejo Montevideo Elementary","date":"2021-06-02","occ":"Graduation","pkg":"Custom Order $TBD","val":0,"lead":"Referral","ref":"","year":2021,"ts":"2021-05-06T17:04:40.131000"},{"id":233,"k":"(714) 322-0485","name":"Kathy Moussiaux","phone":"(714) 322-0485","email":"kmoussiaix@yahoo.com","addr":"4 Via Andorra Coto De Caza","date":"2021-06-05","occ":"Graduation","pkg":"Graduation Package - $300","val":300.0,"lead":"Other","ref":"","year":2021,"ts":"2021-05-10T13:18:15.536000"},{"id":234,"k":"(949) 351-1450","name":"Patrice Bradford","phone":"(949) 351-1450","email":"teecee4444@gmail.com","addr":"29 wakonda Trabuco canyon","date":"2021-05-21","occ":"Birthday","pkg":"Two Tower Package - $150","val":150.0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-05-10T17:52:38.019000"},{"id":235,"k":"(949) 698-2191","name":"Brian D Hardy","phone":"(949) 698-2191","email":"brianhardy162@gmail.com","addr":"8 weber lane","date":"2021-06-05","occ":"Birthday","pkg":"Special Occasion Garland Package - $225","val":225.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-05-11T06:32:16.077000"},{"id":236,"k":"(949) 616-6435","name":"Jami Orlowski / My daughter Marley","phone":"(949) 616-6435","email":"jamiorlowski@gmail.com","addr":"24752 Evereve Circle; Lake Forest, CA 92630","date":"2021-05-14","occ":"Birthday","pkg":"Two Tower Package - $165","val":165.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-05-11T14:54:31.100000"},{"id":237,"k":"(949) 584-7027","name":"Michelle Buessing","phone":"(949) 584-7027","email":"michellebuessing@hotmail.com","addr":"29101 Wood Canyon Road, Silverado CA 92676","date":"2021-06-03","occ":"Graduation","pkg":"Porch POP! $85","val":85.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-05-14T10:01:56.926000"},{"id":238,"k":"(949) 412-4757","name":"Maureen Enoch","phone":"(949) 412-4757","email":"etcket71@yahoo.com","addr":"Cordillera Elementary School- Mission Viejo","date":"2021-06-02","occ":"Graduation","pkg":"Custom Order $TBD","val":0,"lead":"Referral","ref":"","year":2021,"ts":"2021-05-14T10:23:47.172000"},{"id":239,"k":"(949) 633-6649","name":"Jenna Schick","phone":"(949) 633-6649","email":"jennabecker10@gmail.com","addr":"1005 E Buffalo Ave Santa Ana 92706","date":"2021-06-12","occ":"Baby Shower","pkg":"Special Occasion Garland Package - $225","val":225.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-05-16T18:57:17.424000"},{"id":240,"k":"(949) 285-0957","name":"Megan Kirby","phone":"(949) 285-0957","email":"megan.kirby@syspro.us.com","addr":"1775 Flight Way, Tustin CA","date":"2021-08-23","occ":"Corporate/Organization","pkg":"Infinity Circle Balloon Arch - $450","val":450.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-05-18T15:05:06.289000"},{"id":241,"k":"(832) 231-1736","name":"Wendy Andana","phone":"(832) 231-1736","email":"wendy.andana@gmail.com","addr":"120 Retama Dr, Georgetown tx 78626","date":"2021-06-05","occ":"Birthday","pkg":"Porch POP! $85","val":85.0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-05-18T16:30:58.252000"},{"id":242,"k":"(979) 308-9990","name":"Dacia Cahanin-Salina","phone":"(979) 308-9990","email":"dacia.salinas80@gmail.com","addr":"2104 Ambling Trail, Georgetown, Texas 78628","date":"2021-05-28","occ":"Graduation","pkg":"Porch POP! $95","val":95.0,"lead":"Instagram","ref":"","year":2021,"ts":"2021-05-25T12:52:10.396000"},{"id":243,"k":"(714) 477-4118","name":"Monica Awadalla","phone":"(714) 477-4118","email":"monica.awadalla@gmail.com","addr":"7 Saint Raphael, Laguna Niguel","date":"2021-05-29","occ":"Birthday","pkg":"Porch POP! $95","val":95.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-05-25T13:44:36.580000"},{"id":244,"k":"(949) 278-0852","name":"Shanna","phone":"(949) 278-0852","email":"mckay2004@cox.net","addr":"39 agapanthus Street Ladera Ranch","date":"2021-06-05","occ":"Graduation","pkg":"Porch POP! $95","val":95.0,"lead":"Instagram","ref":"","year":2021,"ts":"2021-05-28T08:26:58.747000"},{"id":245,"k":"(949) 616-4968","name":"Suzanne snapper","phone":"(949) 616-4968","email":"ssnapper@ensigngroup.com","addr":"27721 horseshoe bend, San Juan Capistrano, ca 92675","date":"2021-05-29","occ":"Graduation","pkg":"Two Tower Package - $165","val":165.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-05-28T10:43:47.337000"},{"id":246,"k":"(714) 209-1135","name":"Cindy Juliani","phone":"(714) 209-1135","email":"cjuliani32@gmail.com","addr":"3 Cottage Hill Ladera Ranch","date":"2021-06-01","occ":"Graduation","pkg":"Porch POP! $95","val":95.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-05-29T14:59:44.621000"},{"id":247,"k":"(949) 338-7015","name":"Robyn Brooks","phone":"(949) 338-7015","email":"robynwillett@yahoo.com","addr":"9 baneberry aliso viejo","date":"2021-07-31","occ":"Graduation","pkg":"Graduation Package - $325","val":325.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-05-31T15:54:29.310000"},{"id":248,"k":"(949) 338-7015","name":"Robyn brooks","phone":"(949) 338-7015","email":"robynwillett@yahoo.com","addr":"23954 juaneno dr mission viejo","date":"2021-07-15","occ":"Birthday","pkg":"Porch POP! $95","val":95.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-05-31T16:00:02.875000"},{"id":249,"k":"(805) 415-7316","name":"Ashley Granich","phone":"(805) 415-7316","email":"akgranich@gmail.com","addr":"1150 Magic Way, Anaheim, Ca","date":"2021-10-23","occ":"Birthday","pkg":"Extra Large Garland Package - $299","val":299.0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-05-31T19:37:54.353000"},{"id":250,"k":"(949) 463-8832","name":"Carine","phone":"(949) 463-8832","email":"carineb@cox.net","addr":"50 sunnydale lane, Rancho Santa margarita ca","date":"2021-06-27","occ":"Graduation","pkg":"had to cancel because Amanda was out of town","val":0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-06-01T15:06:39.380000"},{"id":251,"k":"(714) 335-1819","name":"leslie.bartoli","phone":"(714) 335-1819","email":"leslie.bartoli@gmail.com","addr":"16934 , Summeroak Court","date":"2021-07-31","occ":"Special Occasion","pkg":"Special Occasion Garland Package - $225","val":225.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-06-20T19:28:53.938000"},{"id":252,"k":"(714) 582-1813","name":"Jessica Lopez","phone":"(714) 582-1813","email":"jlopez@contractsg.com","addr":"50 Prism Irvine, CA 92618- The Village Apartment Homes-Occasions Room","date":"2021-06-30","occ":"Special Occasion","pkg":"Custom Order $TBD","val":0,"lead":"Other","ref":"","year":2021,"ts":"2021-06-24T14:11:38.705000"},{"id":253,"k":"(949) 374-1710","name":"Candace Wood","phone":"(949) 374-1710","email":"candaceann71@gmail.com","addr":"9 Caelum Court, CDC","date":"2021-07-21","occ":"Birthday","pkg":"Porch POP! $95","val":95.0,"lead":"Instagram","ref":"","year":2021,"ts":"2021-06-29T17:13:01.987000"},{"id":254,"k":"(949) 533-0127","name":"Bria Forehand","phone":"(949) 533-0127","email":"briaforehand@yahoo.com","addr":"21 Via Caseta RSM, CA 92688","date":"2021-08-01","occ":"Birthday","pkg":"Special Occasion Garland Package - $225","val":225.0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-07-01T12:34:50.236000"},{"id":255,"k":"(949) 466-2600","name":"Lindsay Forschner","phone":"(949) 466-2600","email":"linzfish@gmail.com","addr":"1 Covenant Hills Drive, Ladera Ranch, CA","date":"2021-12-26","occ":"Birthday","pkg":"Dinner Party Package - $400","val":400.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-07-28T14:15:50.160000"},{"id":256,"k":"(949) 322-0213","name":"Michelle Farina","phone":"(949) 322-0213","email":"michellefarina@cox.net","addr":"28161 Cascabel, Mission Viejo CA 92692","date":"2021-08-22","occ":"Baby Shower","pkg":"Special Occasion Garland Package - $225","val":225.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-08-02T15:36:14.939000"},{"id":257,"k":"(512) 413-9792","name":"Sarah Drury","phone":"(512) 413-9792","email":"noelle512@gmail.com","addr":"3464 De Soto Loop, Round Rock","date":"2021-09-01","occ":"Special Occasion","pkg":"Porch POP! $95","val":95.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-08-03T12:24:07.268000"},{"id":258,"k":"(949) 338-7015","name":"Robyn brooks","phone":"(949) 338-7015","email":"robynwillett@yahoo.com","addr":"23954 juaneno dr mission viejo ca","date":"2021-10-28","occ":"Birthday","pkg":"Porch POP! $95","val":95.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-08-03T18:05:07.114000"},{"id":259,"k":"(949) 292-5394","name":"Sri","phone":"(949) 292-5394","email":"sdivel@saltcreekgrille.com","addr":"Park - 28172 Camino del Rio SJC is close","date":"2021-08-08","occ":"Birthday","pkg":"Favorite Things Birthday Package - $250","val":250.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-08-04T15:43:25.791000"},{"id":260,"k":"(949) 292-9923","name":"Kimberlie Jean Harmon","phone":"(949) 292-9923","email":"kim@listenresearch.com","addr":"1 Joliet Drive Coto","date":"2021-09-11","occ":"Birthday","pkg":"Custom Order $TBD","val":0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-08-06T11:53:54.554000"},{"id":261,"k":"(949) 246-7414","name":"Faith Agius","phone":"(949) 246-7414","email":"faithagius@gmail.com","addr":"11 Hawthorne Lane, Coto De Caza","date":"2021-08-21","occ":"Birthday","pkg":"Two Tower Package - $165","val":165.0,"lead":"Other","ref":"","year":2021,"ts":"2021-08-12T13:37:33.168000"},{"id":262,"k":"(949) 647-9970","name":"Nancy Pino","phone":"(949) 647-9970","email":"nanysyd1@hotmail.com","addr":"Aliso viejo","date":null,"occ":"Birthday","pkg":"Custom Order $TBD","val":0,"lead":"Referral","ref":"","year":null,"ts":"2021-08-18T19:40:44.346000"},{"id":263,"k":"(949) 533-0127","name":"Bria Forehand","phone":"(949) 533-0127","email":"briaforehand@yahoo.com","addr":"21 Via Caseta RSM, CA 92688","date":"2021-10-10","occ":"Birthday","pkg":"Special Occasion Garland Package - $225","val":225.0,"lead":"Other","ref":"","year":2021,"ts":"2021-08-25T14:21:42.380000"},{"id":264,"k":"(949) 836-5826","name":"Casey Dixon","phone":"(949) 836-5826","email":"caseydixon75@gmail.com","addr":"24932 Veterans Way Mission Viejo, CA 92692 Norman P Murray Senior Center","date":"2021-09-09","occ":"Special Occasion","pkg":"Special Occasion Garland Package - $225","val":225.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-08-26T15:28:01.591000"},{"id":265,"k":"(714) 318-7027","name":"Beth","phone":"(714) 318-7027","email":"quinlan.beth@gmail.com","addr":"12 Cloverdale, RSM 92688","date":"2021-10-09","occ":"Birthday","pkg":"Favorite Things Birthday Package - $250","val":250.0,"lead":"Instagram","ref":"","year":2021,"ts":"2021-08-28T13:42:23.784000"},{"id":266,"k":"(512) 497-3688","name":"Michelle Martinez","phone":"(512) 497-3688","email":"mburch3@gmail.com","addr":"425 Southern Cross Dr. Austin TX 78717","date":"2021-09-09","occ":"Birthday","pkg":"Porch POP! $95","val":95.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-09-02T14:38:32.785000"},{"id":267,"k":"(310) 925-1429","name":"Judith Kaufman","phone":"(310) 925-1429","email":"judykaufman13@gmail.com","addr":"51 Sagitta Way , Coto de Caza 92679","date":"2021-09-11","occ":"Birthday","pkg":"Custom Order $TBD","val":0,"lead":"Referral","ref":"","year":2021,"ts":"2021-09-03T11:18:33.589000"},{"id":268,"k":"(702) 540-2430","name":"Shari Cahill TX","phone":"(702) 540-2430","email":"18carrotbakery@gmail.com","addr":"710 SAustin Ave","date":"2021-10-01","occ":"Special Occasion","pkg":"Custom Order $TBD","val":0,"lead":"Other","ref":"","year":2021,"ts":"2021-09-06T09:37:34.176000"},{"id":269,"k":"(949) 689-7320","name":"Krista Hagen","phone":"(949) 689-7320","email":"kristaruetz@gmail.com","addr":"15 Cornflower Street Coto de Caza","date":null,"occ":"Birthday","pkg":"Porch POP! $95","val":95.0,"lead":"Other","ref":"","year":null,"ts":"2021-09-06T20:33:06.625000"},{"id":270,"k":"(949) 363-1599","name":"Jessica Malvin","phone":"(949) 363-1599","email":"august478@hotmail.com","addr":"1 Ritz Carlton Dr","date":"2021-11-06","occ":"Birthday","pkg":"Special Occasion Garland Package - $225","val":225.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-09-07T11:34:22.113000"},{"id":271,"k":"(858) 213-9635","name":"Laceita Mascari","phone":"(858) 213-9635","email":"laceita79@gmail.com","addr":"21402 Avenida Manantial Lake Forest ca 92630","date":"2021-10-09","occ":"Baby Shower","pkg":"Custom Order $TBD","val":0,"lead":"Referral","ref":"","year":2021,"ts":"2021-09-19T16:58:27.255000"},{"id":272,"k":"(949) 306-4879","name":"Stacy Feltman","phone":"(949) 306-4879","email":"stacy@stacyfeltman.com","addr":"23331 V\u00eda Venado, CDC, Ca 92679","date":"2021-10-08","occ":"Special Occasion","pkg":"Special Occasion Garland Package - $225","val":225.0,"lead":"Other","ref":"","year":2021,"ts":"2021-09-22T21:22:45.551000"},{"id":273,"k":"(512) 577-9598","name":"Trish Giessinger TX","phone":"(512) 577-9598","email":"tgiess@me.com","addr":"339 Bold Sundown, Liberty Hill, TX 78642","date":"2021-10-09","occ":"Birthday","pkg":"Special Occasion Garland Package - $225","val":225.0,"lead":"Other","ref":"","year":2021,"ts":"2021-09-25T21:07:43.477000"},{"id":274,"k":"(949) 525-6587","name":"Kristen Dennis","phone":"(949) 525-6587","email":"kmarqdennis@gmail.com","addr":"3 formero RMV 92694","date":"2021-10-31","occ":"Holiday","pkg":"Two Tower Package - $165","val":165.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-09-27T20:10:17.795000"},{"id":275,"k":"(512) 826-3234","name":"Keri","phone":"(512) 826-3234","email":"keri.hutton@gmail.com","addr":"711 E University Avenue","date":"2021-10-09","occ":"Birthday","pkg":"Porch POP! $95","val":95.0,"lead":"Other","ref":"","year":2021,"ts":"2021-10-05T08:48:31.928000"},{"id":276,"k":"(248) 978-4556","name":"Chelsea Gray","phone":"(248) 978-4556","email":"chelsea.gray111@gmail.com","addr":"100 Spectrum Center Drive, Irvine, CA, 92618","date":"2021-10-20","occ":"Special Occasion","pkg":"Dinner Party Package - $400","val":400.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-10-09T15:10:37.217000"},{"id":277,"k":"(949) 584-4307","name":"Shannon Santoni","phone":"(949) 584-4307","email":"shansantoni@gmail.com","addr":"25 Salinger Court, Coto de Caza","date":"2021-10-16","occ":"Birthday","pkg":"Special Occasion Garland Package - $225","val":225.0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-10-12T17:42:41.757000"},{"id":278,"k":"(949) 395-7914","name":"Jamie Parnell","phone":"(949) 395-7914","email":"jmparnell@att.net","addr":"32252 Via Del Sol, Trabuco Canyon 92679","date":"2021-10-30","occ":"Birthday","pkg":"Porch POP! $95","val":95.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-10-15T08:58:17.511000"},{"id":279,"k":"(949) 933-1950","name":"Janine Koury","phone":"(949) 933-1950","email":"j9koury@gmail.com","addr":"2860 Alta Vista Dr, Newport Beach","date":"2021-10-23","occ":"Birthday","pkg":"Extra Large Garland Package - $299","val":299.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-10-17T11:24:38.647000"},{"id":280,"k":"(949) 351-1450","name":"Patrice Bradford","phone":"(949) 351-1450","email":"teecee4444@gmail.com","addr":"45 clover, lake forest","date":"2021-10-22","occ":"Birthday","pkg":"Garland on the Go! - $100","val":100.0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-10-17T22:14:52.447000"},{"id":281,"k":"(512) 789-8413","name":"Krista Richardson TX","phone":"(512) 789-8413","email":"lockwoodkrista@yahoo.com","addr":"301 Del Webb Blvd Georgetown,TX 78633","date":"2021-11-13","occ":"Special Occasion","pkg":"Custom Order $TBD","val":0,"lead":"Instagram","ref":"","year":2021,"ts":"2021-10-18T19:03:16.140000"},{"id":282,"k":"(949) 482-5488","name":"Laura Breaux","phone":"(949) 482-5488","email":"leb.usc@gmail.com","addr":"Dove Canyon Country Club. We will need the balloons secured to two golf carts.","date":"2021-10-25","occ":"Special Occasion","pkg":"Porch POP! $95","val":95.0,"lead":"Other","ref":"","year":2021,"ts":"2021-10-22T06:54:47.145000"},{"id":283,"k":"(714) 273-7229","name":"Robyn Justl","phone":"(714) 273-7229","email":"robynjustl@icloud.com","addr":"6 Roquedo RSM 92688","date":"2021-11-06","occ":"Birthday","pkg":"Garland $150","val":150.0,"lead":"Facebook","ref":"","year":2021,"ts":"2021-10-23T08:07:19.478000"},{"id":284,"k":"(949) 278-9793","name":"Allison Mandel","phone":"(949) 278-9793","email":"tnk729@googlemail.com","addr":"23072 via celeste Coto de caza, ca 92679","date":"2021-11-05","occ":"Special Occasion","pkg":"Infinity Circle Balloon Arch - $450","val":450.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-10-27T10:32:23.625000"},{"id":285,"k":"(949) 278-9793","name":"Allison mandel","phone":"(949) 278-9793","email":"tnk729@googlemail.com","addr":"23072 via celeste Coto de caza, ca 92679","date":"2021-11-13","occ":"Birthday","pkg":"Favorite Things Birthday Package - $250","val":250.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-10-27T10:40:53.926000"},{"id":286,"k":"(916) 601-5279","name":"Melissa Kawanaka","phone":"(916) 601-5279","email":"mkawanaka@me.com","addr":"Not sure yet but maybe the RSM bell tower","date":"2022-01-29","occ":"Birthday","pkg":"Dinner Party Package - $400","val":400.0,"lead":"Referral","ref":"","year":2022,"ts":"2021-11-10T16:58:14.663000"},{"id":287,"k":"(949) 933-4457","name":"Jamie Freeze","phone":"(949) 933-4457","email":"jamiefreeze444@gmail.com","addr":"21085 Shadow Rock Ln Trabuco Canyon","date":"2021-11-17","occ":"Birthday","pkg":"Porch POP! $95","val":95.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-11-10T22:55:55.565000"},{"id":288,"k":"(949) 689-7320","name":"Krista Hagen","phone":"(949) 689-7320","email":"kristaruetz@gmail.com","addr":"15 Corn Flower Street","date":"2021-11-15","occ":"Birthday","pkg":"Porch POP! $95","val":95.0,"lead":"Other","ref":"","year":2021,"ts":"2021-11-14T13:07:46.278000"},{"id":289,"k":"(832) 680-4153","name":"Cillia Marion","phone":"(832) 680-4153","email":"create@marionevents.com","addr":"Sendera Springs in Kerrville, TX","date":"2021-12-13","occ":"Special Occasion","pkg":"Custom Order $TBD","val":0,"lead":"Other","ref":"","year":2021,"ts":"2021-11-15T07:00:41.388000"},{"id":290,"k":"(510) 432-3289","name":"Danielle","phone":"(510) 432-3289","email":"russelld103@gmail.com","addr":"31 Elliot Ln Coto de Caza","date":"2021-11-20","occ":"Birthday","pkg":"Special Occasion Garland Package - $225","val":225.0,"lead":"Referral","ref":"","year":2021,"ts":"2021-11-15T13:22:18.515000"},{"id":291,"k":"(949) 395-1186","name":"Amanda Elhaj","phone":"(949) 395-1186","email":"amandaelhaj@gmail.com","addr":"43 Fuente, RSM 92688","date":"2021-12-10","occ":"Birthday","pkg":"Porch POP! $95","val":95.0,"lead":"Other","ref":"","year":2021,"ts":"2021-11-20T09:03:27.259000"},{"id":292,"k":"(714) 318-7027","name":"Beth Sullivan","phone":"(714) 318-7027","email":"quinlan.beth@gmail.com","addr":"12 Cloverdale, RSM, CA 92688","date":"2022-01-13","occ":"Birthday","pkg":"Porch POP","val":0,"lead":"Other","ref":"","year":2022,"ts":"2021-12-14T20:33:35.374000"},{"id":293,"k":"(714) 396-5852","name":"Ansley Burke","phone":"(714) 396-5852","email":"ansleywolfe@gmail.com","addr":"27212 Cordero Lane,  Mission Viejo","date":"2022-02-06","occ":"Birthday","pkg":"Custom Order $TBD","val":0,"lead":"Referral","ref":"","year":2022,"ts":"2021-12-19T18:04:19.538000"},{"id":294,"k":"(651) 338-1223","name":"Christine DePillo","phone":"(651) 338-1223","email":"christine.depillo@gmail.com","addr":"25262 RockRidge rd, laguna hills CA 92653","date":"2022-01-08","occ":"Birthday","pkg":"Favorite Things Package $285","val":285.0,"lead":"Referral","ref":"","year":2022,"ts":"2021-12-28T15:02:51.160000"},{"id":295,"k":"(949) 750-7079","name":"Rachel Dunn","phone":"(949) 750-7079","email":"rsutra@ymail.co","addr":"5 Olympic way coto","date":"2022-01-08","occ":"Baby Shower","pkg":"Dinner Party Package - $400","val":400.0,"lead":"Facebook","ref":"","year":2022,"ts":"2022-01-02T12:59:36.434000"},{"id":296,"k":"(714) 260-3671","name":"Linh Tran","phone":"(714) 260-3671","email":"lvt10rsm@gmail.com","addr":"10 San Ignacio, RSM 92688","date":"2022-01-09","occ":"Baby Shower","pkg":"Custom Order $TBD","val":0,"lead":"Other","ref":"","year":2022,"ts":"2022-01-03T20:22:22.822000"},{"id":297,"k":"(949) 290-0592","name":"Rebekah young","phone":"(949) 290-0592","email":"rebekahnyoung3@gmail.com","addr":"Sports park Coto de caza","date":"2022-05-29","occ":"Birthday","pkg":"Custom Order $TBD","val":0,"lead":"Facebook","ref":"","year":2022,"ts":"2022-01-17T13:04:18.399000"},{"id":298,"k":"(562) 618-0570","name":"MariAnne Periquet","phone":"(562) 618-0570","email":"alpcool@cox.net","addr":"Tesoro Highschool 1 Tesoro Creek Rd Las Flores, Ca 92688","date":"2022-01-27","occ":"School/Team Event","pkg":"Custom Order $TBD","val":0,"lead":"Facebook","ref":"","year":2022,"ts":"2022-01-19T12:15:06.660000"},{"id":299,"k":"(949) 689-7320","name":"Krista Hagen","phone":"(949) 689-7320","email":"Kristaruetz@gmail.com","addr":"15 Corn Flower St Coto de Caza CA 92679","date":"2022-02-01","occ":"Birthday","pkg":"Two Tower Package - $195","val":195.0,"lead":"Other","ref":"","year":2022,"ts":"2022-01-23T11:02:14.150000"},{"id":300,"k":"(209) 985-5979","name":"Laura DeFreitas","phone":"(209) 985-5979","email":"defreitas.laurae@gmail.com","addr":"1801 cherry glade trail","date":"2022-06-04","occ":"Wedding/Engagement","pkg":"Custom Order $TBD","val":0,"lead":"Other","ref":"","year":2022,"ts":"2022-01-28T14:11:11.719000"},{"id":301,"k":"(949) 351-1450","name":"Patrice Bradford","phone":"(949) 351-1450","email":"teecee4444@gmail.com","addr":"29 wakonda Trabuco canyon 92679","date":"2022-02-12","occ":"Special Occasion","pkg":"Custom Order $TBD","val":0,"lead":"Facebook","ref":"","year":2022,"ts":"2022-02-02T15:39:09.198000"},{"id":302,"k":"(949) 212-6864","name":"lisa gorlick","phone":"(949) 212-6864","email":"Lisa@ProductReviewer.me","addr":"16 Falkner Drive Ladera Ranch","date":null,"occ":"Wedding/Engagement","pkg":"Special Occasion Package $285","val":285.0,"lead":"Other","ref":"","year":null,"ts":"2022-02-04T17:57:22.365000"},{"id":303,"k":"(949) 689-5023","name":"Inga Benebo","phone":"(949) 689-5023","email":"roxygirl810@hotmail.com","addr":"22 Korite Rsm 92688","date":"2022-02-19","occ":"Birthday","pkg":"Two Tower Package - $195","val":195.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-02-14T12:00:18.629000"},{"id":304,"k":"(512) 587-9127","name":"Tina Mallach","phone":"(512) 587-9127","email":"tina@mallachandcompany.com","addr":"918 Palos Verdes  leander Tx","date":"2022-02-26","occ":"Baby Shower","pkg":"Special Occasion Package $285","val":285.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-02-19T07:20:15.556000"},{"id":305,"k":"(951) 420-2298","name":"Arthur","phone":"(951) 420-2298","email":"arthurflores80@gmail.com","addr":"2200 TWIN PEAKS CV, LEANDER TX 78641","date":"2022-03-04","occ":"Birthday","pkg":"Porch POP! $105","val":105.0,"lead":"Other","ref":"","year":2022,"ts":"2022-02-27T00:49:34.476000"},{"id":306,"k":"(323) 974-5943","name":"Arlene James","phone":"(323) 974-5943","email":"arlene.james@gmail.com","addr":"26 Cascada RSM","date":"2022-03-29","occ":"Birthday","pkg":"Porch POP! $105","val":105.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-03-17T16:56:48.096000"},{"id":307,"k":"(949) 290-1493","name":"Jennifer Goodbrand","phone":"(949) 290-1493","email":"jennifer.goodbrand@technologent.com","addr":"100 Spectrum Center Drive Suite 700 Irvine Ca 92618","date":"2022-03-29","occ":"Corporate/Organization","pkg":"Porch POP! $105","val":105.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-03-23T09:10:24.791000"},{"id":308,"k":"(714) 356-0337","name":"Judi Zappia","phone":"(714) 356-0337","email":"jlehnherr@cox.net","addr":"27971 Avenida Armijo Laguna Niguel CA","date":"2022-03-26","occ":"Birthday","pkg":"Porch POP! $105","val":105.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-03-23T10:36:23.101000"},{"id":309,"k":"(949) 689-7320","name":"Krista Hagen","phone":"(949) 689-7320","email":"kristaruetz@gmail.com","addr":"15 Corn Flower","date":"2022-04-01","occ":"Birthday","pkg":"Porch POP! $105","val":105.0,"lead":"Other","ref":"","year":2022,"ts":"2022-03-27T11:26:03.805000"},{"id":310,"k":"(281) 948-4429","name":"Chelsea Gray","phone":"(281) 948-4429","email":"chelseacone@yahoo.com","addr":"113 Dove tail lane Georgetown texas 78628","date":"2022-04-09","occ":"Birthday","pkg":"Custom Order $TBD","val":0,"lead":"Referral","ref":"","year":2022,"ts":"2022-03-29T12:50:48.179000"},{"id":311,"k":"(949) 439-2306","name":"Emerald Morales","phone":"(949) 439-2306","email":"emeraldmorales@hotmail.com","addr":"32925 arrowhead drive trabuco canyon ca 92679","date":"2022-04-08","occ":"Birthday","pkg":"Porch POP! $105","val":105.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-03-29T15:04:40.051000"},{"id":312,"k":"(512) 554-7046","name":"britni h lemons","phone":"(512) 554-7046","email":"britniebeling@hotmail.com","addr":"228 Christine Ln, Liberty Hill, TX 78642","date":"2022-04-05","occ":"Birthday","pkg":"Porch POP! $105","val":105.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-03-31T14:25:17.835000"},{"id":313,"k":"(909) 896-7123","name":"Denise Presnillo","phone":"(909) 896-7123","email":"dpresnillo@gmail.com","addr":"18712 University Dr Irvine, CA 92612 United States","date":"2022-06-18","occ":"Birthday","pkg":"Custom Order $TBD","val":0,"lead":"Referral","ref":"","year":2022,"ts":"2022-04-08T00:41:58.071000"},{"id":314,"k":"(512) 970-5781","name":"Chris Giessinger","phone":"(512) 970-5781","email":"cgiessin@gmail.com","addr":"339 Bold Sundown Liberty Hill, TX 78642","date":"2022-04-17","occ":"Special Occasion","pkg":"Special Occasion Package $285","val":285.0,"lead":"Other","ref":"","year":2022,"ts":"2022-04-08T05:26:39.072000"},{"id":315,"k":"(949) 533-6788","name":"Kristina Kauffman","phone":"(949) 533-6788","email":"kristina.m.long@gmail.com","addr":"2012 Highland Dr Newport Beach, CA 92660","date":"2022-04-24","occ":"Birthday","pkg":"Custom Order $TBD","val":0,"lead":"Referral","ref":"","year":2022,"ts":"2022-04-12T12:57:11.187000"},{"id":316,"k":"(949) 636-1359","name":"Marissa Euperio","phone":"(949) 636-1359","email":"marissaeuperio@icloud.com","addr":"Location: William Mason Regional Park, SHELTER #2 Address: 18712 University Dr, Irvine, CA 92612","date":"2022-05-29","occ":"Baby Shower","pkg":"Special Occasion Package $285","val":285.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-04-18T22:30:14.903000"},{"id":317,"k":"(949) 257-8944","name":"Kayla Kmett","phone":"(949) 257-8944","email":"kmettk@smhs.org","addr":"25291 Vista Del Verde, Coto De Caza, CA 92679","date":"2022-05-11","occ":"School/Team Event","pkg":"Two Tower Package - $195","val":195.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-04-19T11:35:31.310000"},{"id":318,"k":"(949) 584-2024","name":"Courtnay Brown","phone":"(949) 584-2024","email":"cfbrown1012@hotmail.com","addr":"South Coast Christian Church  31501 Avenida Los Cerritos  San Juan Capistrano, 92675","date":"2022-04-30","occ":"Special Occasion","pkg":"Dinner Party Package - $400","val":400.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-04-19T16:16:21.021000"},{"id":319,"k":"(325) 315-7995","name":"Julie Lindley","phone":"(325) 315-7995","email":"julie.lindley@hcahealthcare.com","addr":"16030 Park Valley Dr suite 100 Round Rock TX 78681","date":"2022-05-09","occ":"Corporate/Organization","pkg":"Custom Order $TBD","val":0,"lead":"Referral","ref":"","year":2022,"ts":"2022-04-26T17:04:25.345000"},{"id":320,"k":"(714) 292-7177","name":"Lauren Giacobbe","phone":"(714) 292-7177","email":"lgiacobbe2@gmail.com","addr":"27100 south ridge drive. Mission viejo","date":"2022-05-08","occ":"Special Occasion","pkg":"Porch POP! $105","val":105.0,"lead":"Other","ref":"","year":2022,"ts":"2022-04-26T19:34:31"},{"id":321,"k":"(281) 948-4429","name":"Chelsea Gray","phone":"(281) 948-4429","email":"chelseacone@yahoo.com","addr":"Top golf austin- 2700 Esperanza Crossing Austin TX 78758","date":"2022-05-28","occ":"Graduation","pkg":"Graduation Package - $350","val":350.0,"lead":"Other","ref":"","year":2022,"ts":"2022-04-29T14:01:27.625000"},{"id":322,"k":"(949) 357-6804","name":"Leigh Zellmer","phone":"(949) 357-6804","email":"leigh@blackwellins.com","addr":"Solana Park, 21601 Via Regressos, RSM, CA 92688","date":"2022-05-07","occ":"Special Occasion","pkg":"Porch POP! $105","val":105.0,"lead":"Facebook","ref":"","year":2022,"ts":"2022-05-04T07:12:52.973000"},{"id":323,"k":"(949) 357-6804","name":"Leigh Zellmer","phone":"(949) 357-6804","email":"leigh@blackwellins.com","addr":"Big Air Trampoline, 23251 Avenida de la Carlota, Laguna Hills, CA 92653","date":"2022-05-14","occ":"Birthday","pkg":"Porch POP! $105","val":105.0,"lead":"Facebook","ref":"","year":2022,"ts":"2022-05-04T07:17:58.589000"},{"id":324,"k":"(570) 242-9034","name":"Sou Vilayvanh (Las Flores Middle School)","phone":"(570) 242-9034","email":"sou.vilayvanh@gmail.com","addr":"25862 Antonio Pkwy, Rancho Santa Margarita, CA 92688","date":"2022-05-16","occ":"School/Team Event","pkg":"Custom Order $TBD","val":0,"lead":"Referral","ref":"","year":2022,"ts":"2022-05-05T13:21:59.433000"},{"id":325,"k":"(562) 225-2815","name":"Eva Ambrose","phone":"(562) 225-2815","email":"eambrose@tait.com","addr":"Santa Ana Country Club - 20382 Newport Blvd, Santa Ana Ca 92707","date":"2022-05-25","occ":"Special Occasion","pkg":"2 tower package","val":0,"lead":"Other","ref":"","year":2022,"ts":"2022-05-06T15:52:42.273000"},{"id":326,"k":"(562) 225-2815","name":"Eva Ambrose","phone":"(562) 225-2815","email":"eambrose@tait.com","addr":"Tait & Associates, Inc. 701 Parkcenter Dr. Santa Ana Ca 92705","date":null,"occ":"Special Occasion","pkg":"Custom Order $TBD","val":0,"lead":"Other","ref":"","year":2022,"ts":"2022-05-06T16:18:08.560000"},{"id":327,"k":"(512) 350-6984","name":"Angela Chambers","phone":"(512) 350-6984","email":"archambers1969@gmail.com","addr":"3618 Hawk Ridge, Round Rock, Texas 78665","date":"2022-05-28","occ":"Graduation","pkg":"Two Tower Package - $195","val":195.0,"lead":"Other","ref":"","year":2022,"ts":"2022-05-06T17:08:01.829000"},{"id":328,"k":"(512) 595-4701","name":"Nikki Harrison","phone":"(512) 595-4701","email":"snharrison421@gmail.com","addr":"3806 Pebble Ct, Round Rock 78664","date":"2022-05-14","occ":"Baby Shower","pkg":"Custom Order $TBD","val":0,"lead":"Referral","ref":"","year":2022,"ts":"2022-05-07T04:49:10.752000"},{"id":329,"k":"(512) 590-2979","name":"Heather Horton","phone":"(512) 590-2979","email":"heather_horton@roundrockisd.org","addr":"16455 Great Oaks Drive Round Rock, TX 78681","date":"2022-05-25","occ":"Graduation","pkg":"Custom Order $TBD","val":0,"lead":"Referral","ref":"","year":2022,"ts":"2022-05-09T13:38:04.059000"},{"id":330,"k":"(619) 993-6534","name":"Heather Spears","phone":"(619) 993-6534","email":"heatherasp1@gmail.com","addr":"25422 Chapparosa Park Rd, Laguna Niguel, CA 92677","date":"2022-06-01","occ":"Graduation","pkg":"Two Tower Package - $195","val":195.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-05-13T15:17:07.675000"},{"id":331,"k":"(714) 356-0337","name":"Judi Zappia","phone":"(714) 356-0337","email":"jlehnherr@cox.net","addr":"901 Avenida Presidio, San Clemente 92672","date":"2022-05-21","occ":"Birthday","pkg":"Porch POP! $105","val":105.0,"lead":"Other","ref":"","year":2022,"ts":"2022-05-14T00:31:25.742000"},{"id":332,"k":"(512) 568-7018","name":"Jacky Sauceda","phone":"(512) 568-7018","email":"jackysauceda1@gmail.com","addr":"1321 Ridgefield Loop, 78665","date":"2022-05-22","occ":"Birthday","pkg":"Porch POP! $105","val":105.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-05-16T12:02:14.669000"},{"id":333,"k":"(901) 517-9178","name":"Kyndal Tekell","phone":"(901) 517-9178","email":"kyndal.tekell@gmail.com","addr":"18609 Rio Chama ln austin 78738","date":"2022-05-24","occ":"Baby Shower","pkg":"Porch POP! $105","val":105.0,"lead":"Other","ref":"","year":2022,"ts":"2022-05-17T12:30:40.127000"},{"id":334,"k":"(949) 322-6052","name":"Natalia Roshardt","phone":"(949) 322-6052","email":"natalia.achucarro@marriott.com","addr":"3635 Fashion Way, Torrance CA - Torrance Marriott","date":"2022-05-20","occ":"Corporate/Organization","pkg":"Special Occasion Package $285","val":285.0,"lead":"Other","ref":"","year":2022,"ts":"2022-05-18T16:40:55.964000"},{"id":335,"k":"(959) 246-7414","name":"Faith Agius","phone":"(959) 246-7414","email":"faithagius@gmail.com","addr":"11 Hawthorne Lane, Coto De Caza, Ca 92679","date":"2022-06-03","occ":"Graduation","pkg":"Favorite Things Package $300","val":300.0,"lead":"Other","ref":"","year":2022,"ts":"2022-05-29T07:51:47.552000"},{"id":336,"k":"(714) 745-1012","name":"Taeler Good","phone":"(714) 745-1012","email":"taeler1012@gmail.com","addr":"170 Aspen St, Orange, CA 92869","date":"2022-06-08","occ":"Graduation","pkg":"Two Tower Package - $195","val":195.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-05-31T13:11:59.028000"},{"id":337,"k":"(949) 246-1198","name":"Erica Rahall","phone":"(949) 246-1198","email":"erica.rahall@gmail.com","addr":"Dove Canyon Golf Club, 22682 Golf Club Dr., Trabuco Canyon, 92679","date":"2022-06-06","occ":"Special Occasion","pkg":"Infinity Circle Balloon Arch - $450","val":450.0,"lead":"Other","ref":"","year":2022,"ts":"2022-06-01T00:09:33.313000"},{"id":338,"k":"(949) 525-6587","name":"Kristen Marquis Dennis","phone":"(949) 525-6587","email":"kmarqdennis@gmail.com","addr":"2 tierno, RMV","date":"2022-07-23","occ":"Birthday","pkg":"Custom Order $TBD","val":0,"lead":"Referral","ref":"","year":2022,"ts":"2022-06-01T19:39:44.738000"},{"id":339,"k":"(609) 540-0360","name":"Michelle Zikusoka","phone":"(609) 540-0360","email":"zikusoka@gmail.com","addr":"Archer Hotel 3121 Palm Way, Austin TX","date":"2022-06-11","occ":"Birthday","pkg":"Two Tower Package - $195","val":195.0,"lead":"Other","ref":"","year":2022,"ts":"2022-06-05T12:16:02.161000"},{"id":340,"k":"(915) 329-3133","name":"Regina Porras","phone":"(915) 329-3133","email":"reggieporras@gmail.com","addr":"1113 Naranjo Dr. Georgetown TX 78628","date":"2022-06-07","occ":"Birthday","pkg":"Porch POP! $105","val":105.0,"lead":"Other","ref":"","year":2022,"ts":"2022-06-06T09:57:37.822000"},{"id":341,"k":"(214) 336-3954","name":"Michael Culver","phone":"(214) 336-3954","email":"mdcaggie90@icloud.com","addr":"4802 Mustang Rd., Lago Vista, TX 78645","date":"2022-06-11","occ":"Birthday","pkg":"Porch POP! $105","val":105.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-06-10T13:14:50.072000"},{"id":342,"k":"(512) 970-3786","name":"Tiffany Williams","phone":"(512) 970-3786","email":"tiffanyannwilliams@gmail.com","addr":"1671 Bearkat Canyon Dr., Dripping Springs, TX 78620","date":"2022-08-13","occ":"Birthday","pkg":"Special Occasion Package $285","val":285.0,"lead":"Facebook","ref":"","year":2022,"ts":"2022-06-12T06:20:57.649000"},{"id":343,"k":"(949) 322-6052","name":"Natalia Roshardt","phone":"(949) 322-6052","email":"natiachucarro@aol.com","addr":"1156 Roswell Ave Long Beach, CA 90804","date":"2022-07-09","occ":"Baby Shower","pkg":"Special Occasion Package $285","val":285.0,"lead":"Facebook","ref":"","year":2022,"ts":"2022-06-29T08:34:17.220000"},{"id":344,"k":"2 dewberry RSM","name":"Stephanie Strauch","phone":"2 dewberry RSM","email":"steph4mdm@yahoo.com","addr":"2 dewberry RSM","date":"2022-07-22","occ":"Special Occasion","pkg":"Porch POP! $105","val":105.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-07-12T12:50:07.762000"},{"id":345,"k":"(858) 213-3440","name":"Amber Jacobs","phone":"(858) 213-3440","email":"amber.jacobs@fpimgt.com","addr":"Sheraton Hotel 1101 Woodlawn St Georgetown, TX 78628","date":"2022-07-15","occ":"Corporate/Organization","pkg":"Two Tower Package - $195","val":195.0,"lead":"Other","ref":"","year":2022,"ts":"2022-07-13T11:59:02.742000"},{"id":346,"k":"(949) 302-4510","name":"Anna Baldridge","phone":"(949) 302-4510","email":"scrappinanna@yahoo.com","addr":"4 CHARCA RSM 92688","date":"2022-07-14","occ":"Birthday","pkg":"Porch POP! $105","val":105.0,"lead":"Referral","ref":"","year":2022,"ts":"2022-07-13T16:05:04.991000"},{"id":347,"k":"(832) 267-7356","name":"Cristal Pina","phone":"(832) 267-7356","email":"cristalpina35@gmail.com","addr":"Leander tx","date":"2022-07-23","occ":"Graduation","pkg":"Graduation Package - $350","val":350.0,"lead":"Other","ref":"","year":2022,"ts":"2022-07-16T06:57:34.373000"},{"id":348,"k":"(619) 341-4947","name":"Hanifa Arapovic","phone":"(619) 341-4947","email":"hanifaarapovic@gmail.com","addr":"119 Birdstone ln Georgetown TX 78628","date":"2022-08-20","occ":"Birthday","pkg":"Porch POP! $105","val":105.0,"lead":"Other","ref":"","year":2022,"ts":"2022-07-18T04:36:15.942000"},{"id":349,"k":"(314) 745-8945","name":"Brinda Dudley Cheeran","phone":"(314) 745-8945","email":"Brindacheeran@gmail.com","addr":"Round rock","date":"2022-11-05","occ":"Birthday","pkg":"Custom Order $TBD","val":0,"lead":"Other","ref":"","year":2022,"ts":"2022-09-26T10:54:48.059000"},{"id":350,"k":"(214) 493-3883","name":"Julie Fikac","phone":"(214) 493-3883","email":"juliemadeleine87@gmail.com","addr":"McCoy elementary (will get address!)","date":"2022-10-26","occ":"School/Team Event","pkg":"Custom Order $TBD","val":0,"lead":"Other","ref":"","year":2022,"ts":"2022-10-05T09:37:49.444000"},{"id":351,"k":"(805) 240-6634","name":"Juliett Givogri","phone":"(805) 240-6634","email":"julsgivogri@yahoo.com","addr":"26 Weber Lane, coto de caza, ca 92679","date":"2023-02-04","occ":"Birthday","pkg":"Custom Order $TBD","val":0,"lead":"Facebook","ref":"","year":2023,"ts":"2023-01-18T09:06:45.129000"},{"id":352,"k":"(714) 655-9353","name":"Katina Confrey","phone":"(714) 655-9353","email":"kateens777@hotmail.com","addr":"Dave and Buster\u2019s Irvine Spectrum","date":"2023-05-26","occ":"Graduation","pkg":"Custom Order $TBD","val":0,"lead":"Facebook","ref":"","year":2023,"ts":"2023-03-15T20:13:11.808000"},{"id":353,"k":"(949) 338-7015","name":"Robyn brooks","phone":"(949) 338-7015","email":"robynwillett@yahoo.com","addr":"Montevideo elementary","date":"2024-05-29","occ":"Graduation","pkg":"Two Tower Package - $195","val":195.0,"lead":"Other","ref":"","year":2024,"ts":"2024-02-29T11:30:20.386000"}];

// Snapshot of the active/live order form, used as a fallback if live sync isn't configured or fails
const LIVE_SNAPSHOT = [{"id":1,"k":"(512) 809-0713","name":"Allyson Reed","phone":"(512) 809-0713","email":"childsdaypac@gmail.com","addr":"Austin Public Library Central, 710 W Cesar Chavez St., Austin, TX 78701.  Garden Terrace area","date":"2023-01-28","occ":"Special Occasion","pkg":"Towers either swirled or stacked $100 each (minimum order 2)","val":100.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-01-18T10:42:51.045000"},{"id":2,"k":"(760) 996-2353","name":"Vance B McAlister","phone":"(760) 996-2353","email":"vancemcalister@gmail.com","addr":"Ralph B. Clark Regional Park, Shelter 3, 8800 Rosecrans Ave, Buena Park, CA 90621","date":"2023-04-30","occ":"Baby Shower","pkg":"Organic Garland at $30 a foot (10 foot minimum)","val":300.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-03-23T10:25:21.654000"},{"id":3,"k":"(949) 338-7015","name":"Robyn brooks","phone":"(949) 338-7015","email":"Robynwillett@yahoo.com","addr":"Montevideo elementary","date":"2023-05-31","occ":"Graduation","pkg":"Towers either swirled or stacked $100 each (minimum order 2)","val":100.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-02-26T12:15:55.643000"},{"id":4,"k":"(737) 272-8675","name":"Savannah","phone":"(737) 272-8675","email":"savannah.mallach@gmail.com","addr":"2717 Alexander Dr \nLeander, TX 78641\nHouse","date":"2023-04-15","occ":"Birthday","pkg":"Organic Garland at $30 a foot (10 foot minimum)","val":300.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-03-13T12:38:40.552000"},{"id":5,"k":"(512) 968-5846","name":"Mercedes Del Real","phone":"(512) 968-5846","email":"mercedes_avilez@yahoo.com","addr":"11115 Lakeside Drive, Jonestown, TX 78645","date":"2023-05-05","occ":"Graduation","pkg":"Special Occasion Package $350","val":350.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-03-14T11:27:48.850000"},{"id":6,"k":"(512) 586-8866","name":"Annette Land","phone":"(512) 586-8866","email":"Landfamily1007@gmail.com","addr":"4209 Val Verde Dr.  Georgetown, TX","date":"2023-05-27","occ":"Graduation","pkg":"Special Occasion Package $350","val":350.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-03-16T16:22:54.136000"},{"id":7,"k":"(512) 633-7205","name":"stephanie blay","phone":"(512) 633-7205","email":"sblay@libertyhill.txed.net","addr":"160 county road 255, georgetown tx 78633","date":"2023-04-14","occ":"Wedding/Engagement","pkg":"Infinity Circle Arch $450 (base)","val":450.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-03-24T09:32:36.754000"},{"id":8,"k":"(562) 833-6373","name":"Meredith","phone":"(562) 833-6373","email":"Meredith.collins.dbc@gmail.com","addr":"Tijeras Creek Golf Course","date":"2023-04-07","occ":"School/Team Event","pkg":"Special Occasion Package $350","val":350.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-03-24T12:42:49.598000"},{"id":9,"k":"(713) 962-8962","name":"Maureen Young","phone":"(713) 962-8962","email":"maureennyoung@gmail.com","addr":"Cimarron Hills CC Tennis Area","date":"2023-05-07","occ":"Corporate/Organization","pkg":"Organic Garland at $30 a foot (10 foot minimum)","val":300.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-03-29T15:52:33.761000"},{"id":10,"k":"(512) 473-9345","name":"Teri Jansen","phone":"(512) 473-9345","email":"TJansen@TheKey2Free.org","addr":"Embassy Suites by Hilton Round Rock\n270 Bass Pro Drive\nRound Rock, TX 78665","date":"2023-04-22","occ":"Corporate/Organization","pkg":"Special Occasion Package $350","val":350.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-04-04T17:44:18.184000"},{"id":11,"k":"(512) 788-2636","name":"Micaela Allen","phone":"(512) 788-2636","email":"micaelaanneallen@gmail.com","addr":"1004 Rabbit Brush Road, Leander TX 78641","date":"2023-04-30","occ":"Baby Shower","pkg":"Infinity Circle Arch $450 (base)","val":450.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-04-05T20:34:12.767000"},{"id":12,"k":"(949) 933-5507","name":"Nicci Julian","phone":"(949) 933-5507","email":"Niccijulian@gmail.com","addr":"4225 Porter Farm Rd Georgetown","date":"2023-04-12","occ":"Birthday","pkg":"Fancy Balloon Trees $165 Each (minimum of 2)","val":165.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-04-08T08:43:20.887000"},{"id":13,"k":"(512) 913-9599","name":"Jeff Carter","phone":"(512) 913-9599","email":"jcarter46@austin.rr.com","addr":"105 North Lynwood Trail, Cedar Park, Tx 78613","date":"2023-04-29","occ":"Birthday","pkg":"Porch POP! $150, Tabletop Centerpieces $25-75 each (order total must be $100 minimum for delivery), Ceiling Balloons $50","val":250.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-04-21T21:32:00.096000"},{"id":14,"k":"(512) 246-4411","name":"Julie Lindley","phone":"(512) 246-4411","email":"julie.lindley@hcahealthcare.com","addr":"16030 Park Valley Dr Suite 100 Round Rock TX 78681","date":"2023-05-08","occ":"Corporate/Organization","pkg":"Balloon Clusters $65 each (order must total $100 minimum for delivery)","val":65.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-04-25T09:57:37.564000"},{"id":15,"k":"(914) 373-9353","name":"Bobbi Liyy","phone":"(914) 373-9353","email":"Liyarib@gmail.com","addr":"404 Via de Sienna Blvd Georgetown TX 78628","date":"2023-05-21","occ":"Birthday","pkg":"Special Occasion Package $350, Tabletop Centerpieces $25-75 each (order total must be $100 minimum for delivery), Towers","val":500.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-04-25T17:36:47.178000"},{"id":16,"k":"(650) 644-6573","name":"Abhi","phone":"(650) 644-6573","email":"abhinaya08@utexas.edu","addr":"019 S Heatherwilde Blvd\n\nPflugerville, TX 78660\n\nBldg number 2, Suite 220","date":"2023-05-27","occ":"Baby Shower","pkg":"Special Occasion Package $350","val":350.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-04-26T08:29:25.180000"},{"id":17,"k":"(512) 584-6426","name":"Hope Clark","phone":"(512) 584-6426","email":"Hope@mickeytravels.com","addr":"Maggianos- Domain, Austin TX","date":"2023-08-12","occ":"Graduation","pkg":"Porch POP! $150, Tabletop Centerpieces $25-75 each (order total must be $100 minimum for delivery)","val":200.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-04-29T11:12:06.176000"},{"id":18,"k":"(254) 598-8046","name":"Kristi Parrish","phone":"(254) 598-8046","email":"kristiswt@gmail.com","addr":"115 North East St Belton TX 76513","date":"2023-05-20","occ":"Graduation","pkg":"Special Occasion Package $350, Tabletop Centerpieces $25-75 each (order total must be $100 minimum for delivery)","val":400.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-05-01T20:43:49.020000"},{"id":19,"k":"(512) 716-9342","name":"Shannon Carr","phone":"(512) 716-9342","email":"shannoncarr.westend@gmail.com","addr":"St. Theresa Catholic School Family Center 4311 Small Dr., Austin, 78759. Family Center is near the p","date":"2023-05-25","occ":"Graduation","pkg":"Special Occasion Package $350","val":350.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-05-09T15:59:46.432000"},{"id":20,"k":"(512) 202-2191","name":"Emily Cochran","phone":"(512) 202-2191","email":"emilyc.cochran@icloud.com","addr":"141 Ridgeview Ct.   78628 in Morningstar","date":"2023-05-27","occ":"Birthday","pkg":"Tabletop Centerpieces $25-75 each (order total must be $100 minimum for delivery), Ceiling Balloons $50 for 10 balloons ","val":200.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-05-14T11:04:35.311000"},{"id":21,"k":"(512) 966-2047","name":"Haley wininger","phone":"(512) 966-2047","email":"Haleywininger6@gmail.com","addr":"124 evergreen circle Georgetown, tx 78626","date":"2023-06-03","occ":"Baby Shower","pkg":"Organic Garland at $30 a foot (10 foot minimum)","val":300.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-05-14T20:30:15.401000"},{"id":22,"k":"(949) 887-0386","name":"Lori Schlegel","phone":"(949) 887-0386","email":"lori.schlegel@wlbutler.com","addr":"Arroyo Trabuco Golf Club, 26772 Avery Pkwy, Mission Viejo, CA 92692","date":"2023-09-11","occ":"Special Occasion","pkg":"Towers either swirled or stacked $100 each (minimum order 2)","val":100.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-07-03T15:54:37.743000"},{"id":23,"k":"(956) 639-6191","name":"Victoria Marquez","phone":"(956) 639-6191","email":"victoria.marquez85@gmail.com","addr":"11521 Brindle Ct, Manor, TX 78653","date":"2023-09-23","occ":"Baby Shower","pkg":"Special Occasion Package $350","val":350.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-08-02T17:10:51.876000"},{"id":24,"k":"(919) 593-7421","name":"Alyssa Duggan","phone":"(919) 593-7421","email":"Alyssa.n.adrian@gmail.com","addr":"1500 Country Club Georgetown, TX 78628","date":"2023-11-04","occ":"Baby Shower","pkg":"Infinity Circle Arch $450 (base)","val":450.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-09-22T15:53:04.867000"},{"id":25,"k":"(510) 432-3289","name":"Danielle Jones","phone":"(510) 432-3289","email":"russelld103@gmail.com","addr":"31 Elliot Ln Coto de Caza Ca","date":"2023-11-19","occ":"Birthday","pkg":"Special Occasion Package $350, Ceiling Balloons $50 for 10 balloons (must order $100 for delivery and install)","val":400.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-09-30T20:37:37.430000"},{"id":26,"k":"(512) 639-9797","name":"Faith Thomas","phone":"(512) 639-9797","email":"faithybeth@gmail.com","addr":"711 E 7th Street Georgetown, TX 78626","date":"2023-11-28","occ":"Birthday","pkg":"Special Occasion Package $375","val":375.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-11-09T13:46:15.241000"},{"id":27,"k":"(832) 572-8969","name":"Anna Tabb","phone":"(832) 572-8969","email":"anna.tabb@gmail.com","addr":"1136 River Vista Rd.  Georgetown, TX 78628","date":"2023-12-09","occ":"Birthday","pkg":"Organic Garland at $35 a foot (10 foot minimum)","val":350.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-11-16T09:25:12.012000"},{"id":28,"k":"(714) 273-7229","name":"Robyn Justl","phone":"(714) 273-7229","email":"robynjustl@icloud.com","addr":"6 Roquedo RSM, CA 92688","date":"2023-12-21","occ":"Special Occasion","pkg":"Towers either swirled or stacked $150 each (minimum order 2)","val":150.0,"lead":"Unknown","ref":"","year":2023,"ts":"2023-11-21T10:59:54.241000"},{"id":29,"k":"(806) 438-1085","name":"Kari Davis","phone":"(806) 438-1085","email":"willandkari@gmail.com","addr":"4828 Eagle Feather Dr, Austin Texas 78735","date":"2024-01-14","occ":"Birthday","pkg":"Special Occasion Package $375","val":375.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-01-04T08:41:04.251000"},{"id":30,"k":"(310) 925-1429","name":"Judy Kaufman","phone":"(310) 925-1429","email":"Judykaufman13@gmail.com","addr":"51 Sagitta Way Coto de caza , Ca 92679\nWill need the name for the gate","date":"2024-01-20","occ":"Birthday","pkg":"Special Occasion Package $375","val":375.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-01-15T15:05:16.698000"},{"id":31,"k":"(512) 468-5487","name":"Melanie Allison","phone":"(512) 468-5487","email":"Melanieallisongallery@outlook.com","addr":"Urban Creekside - Round Rock","date":"2024-04-27","occ":"Corporate/Organization","pkg":"Organic Garland at $35 a foot (10 foot minimum)","val":350.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-02-03T22:13:49.055000"},{"id":32,"k":"(512) 922-2481","name":"Kirsten Walton","phone":"(512) 922-2481","email":"klvalashek@gmail.com","addr":"Frog and Bull restaurant in Steiner ranch","date":"2024-02-10","occ":"Birthday","pkg":"Special Occasion Package $375","val":375.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-02-04T11:15:10.306000"},{"id":33,"k":"(914) 943-2476","name":"Casarra Cover","phone":"(914) 943-2476","email":"casarra@whitdoors.com","addr":"Yellow House Bed & Breakfast 2290 FM2268, Salado, TX 76571","date":"2024-03-30","occ":"Baby Shower","pkg":"Infinity Circle Arch $450 (base)","val":450.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-03-23T09:49:09.685000"},{"id":34,"k":"(337) 519-4111","name":"Marissa Ly","phone":"(337) 519-4111","email":"Mthongdy1@gmail.com","addr":"1001 highwater Dr. Georgetown, TX 78628","date":"2024-06-01","occ":"Baby Shower","pkg":"Infinity Circle Arch $450 (base)","val":450.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-04-11T10:55:56.269000"},{"id":35,"k":"(832) 572-8969","name":"Anna Tabb","phone":"(832) 572-8969","email":"anna.tabb@gmail.com","addr":"1136 River Vista Rd. Georgetown, TX 78628","date":"2024-06-08","occ":"Birthday","pkg":"Organic Garland at $35 a foot (10 foot minimum)","val":350.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-04-16T21:47:03.410000"},{"id":36,"k":"(512) 507-0794","name":"Lindsey Nyby","phone":"(512) 507-0794","email":"Lindseynyby@gmail.com","addr":"200 Overlook Court Georgetown TX - you can pull all the way up driveway to setup at gates","date":"2024-05-19","occ":"Graduation","pkg":"Fancy Balloon Trees $165 Each (minimum of 2)","val":165.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-04-24T13:55:24.107000"},{"id":37,"k":"(512) 751-3099","name":"Taylor Stanke","phone":"(512) 751-3099","email":"taystanke@gmail.com","addr":"135 Casa Loma Cirlce","date":"2024-07-13","occ":"Birthday","pkg":"Organic Garland at $35 a foot (10 foot minimum)","val":350.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-05-01T12:50:24.615000"},{"id":38,"k":"(949) 887-0386","name":"LORI SCHLEGEL","phone":"(949) 887-0386","email":"lori.schlegel@wlbutler.com","addr":"26772 AVERY PARKWAY, MISSION VIEJO, CA 92692","date":"2024-08-26","occ":"Special Occasion","pkg":"Towers either swirled or stacked $150 each (minimum order 2)","val":150.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-05-01T16:36:43.374000"},{"id":39,"k":"(714) 882-0757","name":"Nicole Mattis","phone":"(714) 882-0757","email":"Nicolemattis17@gmail.com","addr":"31504 Avenida de Los Flores Rancho Santa Margarita, CA 92688","date":"2024-05-08","occ":"Special Occasion","pkg":"Special Occasion Package $375, Towers either swirled or stacked $150 each (minimum order 2)","val":525.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-05-02T12:20:52.656000"},{"id":40,"k":"(512) 619-9345","name":"Jerri Imhof","phone":"(512) 619-9345","email":"Jerr","addr":"5201 Wolf Pack Dr, Pflugerville, TX 78660","date":"2024-05-19","occ":"School/Team Event","pkg":"Organic Garland at $35 a foot (10 foot minimum)","val":350.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-05-08T10:16:39.476000"},{"id":41,"k":"(214) 395-5652","name":"Dana Pearson","phone":"(214) 395-5652","email":"Danaapearson@gmail.com","addr":"200 speed horse, LH","date":"2024-05-24","occ":"Graduation","pkg":"Arch Backdrop 6'x4' $100 plain (text can be added)","val":100.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-05-08T18:01:52.451000"},{"id":42,"k":"(512) 636-3994","name":"Heather Smith","phone":"(512) 636-3994","email":"heatherlynnsmith12@gmail.com","addr":"Georgetown Country Club, 1500 Country Club Drive, Georgetown TX 78626","date":"2024-05-18","occ":"Birthday","pkg":"Special Occasion Package $375","val":375.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-05-09T07:52:27.583000"},{"id":43,"k":"(512) 677-0862","name":"Laura Moore","phone":"(512) 677-0862","email":"laura@maxcomsecinc.com","addr":"120 Clubhouse Drive Georgetown TX 78628","date":"2024-05-25","occ":"Graduation","pkg":"Organic Garland at $35 a foot (10 foot minimum), Towers either swirled or stacked $150 each (minimum order 2)","val":500.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-05-09T16:56:56.977000"},{"id":44,"k":"(512) 508-1234","name":"Sarah Lee","phone":"(512) 508-1234","email":"Sarah.Lee2@HCAhealthcare.com","addr":"Oakwood Surgery Center","date":"2024-05-20","occ":"Special Occasion","pkg":"Special Occasion Package $375","val":375.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-05-14T19:03:08.311000"},{"id":45,"k":"(415) 290-9144","name":"Kristine Mussoline","phone":"(415) 290-9144","email":"kristinerod77@yahoo.com","addr":"4 amantes Rancho Santa Margarita","date":"2024-06-02","occ":"Graduation","pkg":"Towers either swirled or stacked $150 each (minimum order 2)","val":150.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-05-19T19:46:50.532000"},{"id":46,"k":"(337) 349-1986","name":"Kori LeCompte","phone":"(337) 349-1986","email":"kori.lecompte@curanahealth.com","addr":"139 Estrella Crossing \"West Building\", Georgetown, TX 78628","date":"2024-07-17","occ":"Corporate/Organization","pkg":"Towers either swirled or stacked $150 each (minimum order 2)","val":150.0,"lead":"Unknown","ref":"","year":2024,"ts":"2024-06-24T10:52:25.363000"},{"id":47,"k":"(949) 887-0386","name":"Lori Schlegel","phone":"(949) 887-0386","email":"lori.schlegel@wlbutler.com","addr":"26772 Avery Pkwy, Mission Viejo, CA 92692","date":"2025-08-25","occ":"Corporate/Organization","pkg":"Special Occasion Package $375","val":375.0,"lead":"Unknown","ref":"","year":2025,"ts":"2025-01-21T12:44:21.046000"},{"id":48,"k":"(407) 760-0625","name":"Kendra","phone":"(407) 760-0625","email":"Kendra.ferreri@mongodb.com","addr":"3711 S mopac expressway - MongoDB Office","date":"2025-04-24","occ":"Special Occasion","pkg":"Special Occasion Package $375, Towers either swirled or stacked $150 each (minimum order 2)","val":525.0,"lead":"Unknown","ref":"","year":2025,"ts":"2025-04-09T17:16:09.909000"},{"id":49,"k":"(614) 204-3683","name":"Zach McGlathery","phone":"(614) 204-3683","email":"Zmcglathery@yahoo.com","addr":"148 San Juan Georgetown tx 78633, very end of cup-de-sac","date":"2025-05-24","occ":"Graduation","pkg":"Special Occasion Package $375","val":375.0,"lead":"Unknown","ref":"","year":2025,"ts":"2025-05-09T08:10:41.715000"},{"id":50,"k":"(512) 422-0825","name":"Julie Duffy","phone":"(512) 422-0825","email":"luxglownow@gmail.com","addr":"Davenport Village Salons byJC 3801 N Capital of Texas hwy Austin TX 78746","date":"2025-06-26","occ":"Corporate/Organization","pkg":"Towers either swirled or stacked $150 each (minimum order 2), Arch Backdrop 6'x4' $100 plain (text can be added)","val":250.0,"lead":"Unknown","ref":"","year":2025,"ts":"2025-05-15T23:03:03.605000"},{"id":51,"k":"(737) 218-9677","name":"Kim Constantino Lam","phone":"(737) 218-9677","email":"kiml.constantino@gmail.com","addr":"Residence: 1323 Ridgefield Loop Round Rock,TX 78665","date":"2025-06-28","occ":"Birthday","pkg":"Towers either swirled or stacked $150 each (minimum order 2)","val":150.0,"lead":"Unknown","ref":"","year":2025,"ts":"2025-05-27T10:37:51.897000"},{"id":52,"k":"(949) 923-0995","name":"Kimberly Lally","phone":"(949) 923-0995","email":"lally.kimberly@gmail.com","addr":"200 W Cimarron Hills Trail","date":"2025-08-03","occ":"Birthday","pkg":"Special Occasion Package $375, Organic Garland at $25 a foot (10 foot minimum), Towers either swirled or stacked $150 ea","val":775.0,"lead":"Unknown","ref":"","year":2025,"ts":"2025-07-15T15:40:40.094000"},{"id":53,"k":"(281) 630-1949","name":"Georgia Lucier","phone":"(281) 630-1949","email":"georgialucier@yahoo.com","addr":"The Golden Rule, 606 S. Church St., Georgetown","date":"2025-11-28","occ":"Wedding/Engagement","pkg":"Special Occasion Package $375","val":375.0,"lead":"Unknown","ref":"","year":2025,"ts":"2025-10-23T16:43:45.752000"},{"id":54,"k":"(914) 497-7471","name":"Jeannie","phone":"(914) 497-7471","email":"jeannieonthemove@gmail.com","addr":"3405 Crystal Hill Drive, Cedar Park, TX 78613","date":"2025-12-27","occ":"Graduation","pkg":"Organic Garland at $25 a foot (10 foot minimum)","val":250.0,"lead":"Unknown","ref":"","year":2025,"ts":"2025-11-12T15:47:38.166000"},{"id":55,"k":"(281) 740-5120","name":"Lorren Guy","phone":"(281) 740-5120","email":"lorren.guy@centurycommunities.com","addr":"Dell Diamond 3400 E Palm Valley Blvd, Round Rock, TX 78665","date":"2026-02-05","occ":"Special Occasion","pkg":"Special Occasion Package $375","val":375.0,"lead":"Unknown","ref":"","year":2026,"ts":"2026-01-23T10:31:01.915000"},{"id":56,"k":"(443) 603-4626","name":"Collin Beard","phone":"(443) 603-4626","email":"cbeard@pmpmanage.com","addr":"404 Via De Sienna Blvd., Georgetown, TX 78628","date":"2026-04-29","occ":"Corporate/Organization","pkg":"Towers either swirled or stacked $150 each (minimum order 2)","val":150.0,"lead":"Unknown","ref":"","year":2026,"ts":"2026-03-04T17:41:48.070000"},{"id":57,"k":"(512) 694-5752","name":"Lindsey McDaniel","phone":"(512) 694-5752","email":"227lindsey@gmail.com","addr":"109 E. Rustle Cove","date":"2026-05-21","occ":"Graduation","pkg":"Special Occasion Package $375","val":375.0,"lead":"Unknown","ref":"","year":2026,"ts":"2026-05-05T10:53:29.608000"}];

// ---------------------------------------------------------------------------
// Live-sheet normalization — mirrors the Python cleaning logic used to build
// the historical baseline, so new form rows get parsed the same way.
// ---------------------------------------------------------------------------
function normalizePhone(p) {
  if (!p) return '';
  let s = String(p).replace(/\D/g, '');
  if (s.length === 11 && s.startsWith('1')) s = s.slice(1);
  if (s.length === 10) return `(${s.slice(0, 3)}) ${s.slice(3, 6)}-${s.slice(6, 10)}`;
  return String(p).trim();
}

function occasionBucket(o) {
  if (!o) return 'Unspecified';
  const s = String(o).toLowerCase();
  if (s.includes('birthday')) return 'Birthday';
  if (s.includes('grad')) return 'Graduation';
  if (s.includes('baby shower')) return 'Baby Shower';
  if (s.includes('wedding') || s.includes('engagement') || s.includes('bridal') || s.includes('rehearsal')) return 'Wedding/Engagement';
  if (s.includes('corporate') || s.includes('office') || s.includes('grand opening') || s.includes('gala') || s.includes('fundraiser') || s.includes('appreciation')) return 'Corporate/Organization';
  if (s.includes('holiday') || s.includes('christmas') || s.includes('july')) return 'Holiday';
  if (s.includes('school') || s.includes('banquet') || s.includes('recital') || s.includes('senior night') || s.includes('promotion')) return 'School/Team Event';
  return 'Special Occasion';
}

function splitSegments(text) {
  const segments = [];
  let depth = 0, buf = '';
  for (const ch of text) {
    if (ch === '(') { depth++; buf += ch; }
    else if (ch === ')') { depth = Math.max(0, depth - 1); buf += ch; }
    else if (ch === ',' && depth === 0) { segments.push(buf.trim()); buf = ''; }
    else buf += ch;
  }
  if (buf.trim()) segments.push(buf.trim());
  return segments;
}

function segmentPrice(seg) {
  const segNoParen = seg.replace(/\([^)]*\)/g, '');
  const m = segNoParen.match(/\$\s?(\d+(?:\.\d+)?)\s*-?\s*(\d+(?:\.\d+)?)?/);
  if (!m) return null;
  const lo = parseFloat(m[1]);
  const hi = m[2] ? parseFloat(m[2]) : lo;
  let price = (lo + hi) / 2;
  if (/a\s*foot|per\s*foot/i.test(seg)) {
    const fm = seg.match(/(\d+)\s*foot\s*minimum/i);
    if (fm) price *= parseFloat(fm[1]);
  }
  return price;
}

function estimateValue(text) {
  if (!text || !String(text).trim()) return 0;
  let total = 0, found = false;
  splitSegments(String(text)).forEach(seg => {
    const p = segmentPrice(seg);
    if (p != null) { total += p; found = true; }
  });
  return found ? Math.round(total * 100) / 100 : 0;
}

// Raw row shape expected from the Apps Script bridge (see setup instructions):
// { ts, name, email, phone, eventDate, address, occasion, package, colors, amount }
// ---------------------------------------------------------------------------
// State inference — this business only serves Texas and California, but
// neither source form has an explicit "state" field. We infer it, in order
// of confidence: explicit state text in the address, zip code range, then
// phone area code. Texas is the tie-break default when nothing else is
// available, since it's the business's home market.
// ---------------------------------------------------------------------------
const TX_AREA_CODES = new Set(['210','214','254','281','325','346','361','409','430','432','469','512','682','713','726','737','806','817','830','832','903','915','936','940','956','972','979']);
const CA_AREA_CODES = new Set(['209','213','279','310','323','341','408','415','424','442','510','530','559','562','619','626','628','650','657','661','669','707','714','747','760','805','818','820','831','840','858','909','916','925','949','951']);

function guessOrderState(addr, phone) {
  if (addr) {
    const a = addr.toUpperCase();
    if (/\bTX\b|\bTEXAS\b/.test(a)) return 'Texas';
    if (/\bCA\b|\bCALIFORNIA\b/.test(a)) return 'California';
    const zipMatch = addr.match(/\b(\d{5})\b/);
    if (zipMatch) {
      const z = parseInt(zipMatch[1], 10);
      if ((z >= 75000 && z <= 79999) || (z >= 88500 && z <= 88599)) return 'Texas';
      if (z >= 90000 && z <= 96199) return 'California';
    }
  }
  if (phone) {
    const digits = String(phone).replace(/\D/g, '');
    if (digits.length >= 10) {
      const area = digits.slice(-10, -7);
      if (TX_AREA_CODES.has(area)) return 'Texas';
      if (CA_AREA_CODES.has(area)) return 'California';
    }
  }
  return null;
}

// Client-level state: vote across all of a client's orders (an address on
// any one order is enough), defaulting to Texas only if nothing at all matches.
function guessClientState(clientOrders) {
  const counts = { Texas: 0, California: 0 };
  clientOrders.forEach(o => {
    const s = guessOrderState(o.addr, o.phone);
    if (s) counts[s]++;
  });
  if (counts.Texas === 0 && counts.California === 0) return 'Texas';
  return counts.California > counts.Texas ? 'California' : 'Texas';
}

// Shared by the CRM's column filters and the campaign-builder audience
// picker, so "filter clients" always means the exact same thing everywhere
// in the dashboard.
function clientMatchesFilters(client, filters) {
  if (filters.type && filters.type !== 'all' && client.type !== filters.type) return false;
  if (filters.state && filters.state !== 'all' && client.state !== filters.state) return false;
  if (filters.eventType && filters.eventType !== 'all' && client.lastOcc !== filters.eventType) return false;
  return true;
}

// Raw row shape expected from the Apps Script bridge (see setup instructions):
// { ts, name, email, phone, eventDate, address, occasion, package, colors, amount }
function normalizeLiveRow(row, idx) {
  const phone = normalizePhone(row.phone);
  const email = (row.email || '').trim();
  const k = phone || (email ? email.toLowerCase() : '') || ('live-' + idx);
  const dateStr = row.eventDate ? String(row.eventDate).slice(0, 10) : null;
  const year = dateStr ? parseInt(dateStr.slice(0, 4), 10) : null;
  // Prefer a manually-entered amount if the sheet has one; otherwise fall back
  // to parsing a dollar figure out of the package description text.
  const manualAmount = row.amount !== undefined && row.amount !== null && row.amount !== ''
    ? parseFloat(String(row.amount).replace(/[^0-9.]/g, ''))
    : NaN;
  const val = !isNaN(manualAmount) && manualAmount > 0 ? manualAmount : estimateValue(row.package);
  return {
    id: 'live-' + idx,
    k,
    name: row.name || 'Unnamed',
    phone,
    email,
    addr: (row.address || '').slice(0, 100),
    date: dateStr,
    occ: occasionBucket(row.occasion),
    pkg: (row.package || '').slice(0, 120),
    val,
    lead: 'Unknown',
    ref: '',
    year,
    ts: row.ts || null,
  };
}

// ---------------------------------------------------------------------------
// Build the client roster fresh from whatever order set is active — this is
// what makes the CRM and Home page "dynamic": feed it more orders, get more/
// updated clients automatically, no separate client table to keep in sync.
// ---------------------------------------------------------------------------
function computeClients(orders) {
  const byKey = {};
  orders.forEach(o => { (byKey[o.k] = byKey[o.k] || []).push(o); });

  const clients = Object.entries(byKey).map(([key, recs]) => {
    const sorted = [...recs].sort((a, b) => (a.ts || a.date || '').localeCompare(b.ts || b.date || ''));
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const ltv = recs.reduce((s, r) => s + (r.val || 0), 0);
    const validDates = recs.map(r => r.date).filter(Boolean).sort();
    return {
      k: key,
      name: first.name,
      phone: recs.find(r => r.phone)?.phone || '',
      email: recs.find(r => r.email)?.email || '',
      type: recs.length > 1 ? 'Repeat' : 'First-Time',
      state: guessClientState(recs),
      orders: recs.length,
      firstDate: validDates[0] || null,
      lastDate: validDates[validDates.length - 1] || null,
      ltv: Math.round(ltv * 100) / 100,
      avg: Math.round((ltv / recs.length) * 100) / 100,
      lead: first.lead || 'Unknown',
      ref: first.ref || '',
      lastOcc: last.occ,
      lastPkg: last.pkg,
    };
  });

  clients.sort((a, b) => b.ltv - a.ltv);
  return clients;
}

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------
const COLORS = {
  navy: '#2E1B42',        // deep plum — sidebar & hero background
  navyDeep: '#1F1130',    // darker plum for gradients
  cream: '#FBF6EF',
  card: '#FFFFFF',
  gold: '#D6A94A',
  goldDeep: '#B5872A',
  rose: '#E8879E',
  roseDeep: '#D9647F',
  lavender: '#A78BDB',
  lavenderDeep: '#8B6BC4',
  teal: '#4FB6A8',
  sky: '#7FB3E8',
  ink: '#2A2440',
  inkSoft: '#6B637F',
  line: '#EDE4D6',
};

const OCC_COLORS = {
  'Birthday': COLORS.rose,
  'Graduation': COLORS.gold,
  'Baby Shower': COLORS.sky,
  'Wedding/Engagement': COLORS.lavender,
  'Corporate/Organization': COLORS.teal,
  'Holiday': COLORS.goldDeep,
  'School/Team Event': COLORS.roseDeep,
  'Special Occasion': COLORS.inkSoft,
  'Unspecified': '#C9C2D6',
};

const LEAD_COLORS = {
  'Referral': COLORS.rose,
  'Facebook': COLORS.sky,
  'Instagram': COLORS.lavender,
  'Google': COLORS.teal,
  'Website': COLORS.gold,
  'Other': COLORS.inkSoft,
  'Unknown': '#C9C2D6',
};

const money = (n) => '$' + Math.round(n || 0).toLocaleString('en-US');
const moneyDec = (n) => '$' + (n || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
const todayISO = () => new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------------------
// Derived analytics (computed once from DATA)
// ---------------------------------------------------------------------------
function computeStats(data) {
  const { orders, clients } = data;
  const totalClients = clients.length;
  const totalOrders = orders.length;
  const newClients = clients.filter(c => c.type === 'First-Time').length;
  const repeatClients = clients.filter(c => c.type === 'Repeat').length;
  const grossRevenue = orders.reduce((s, o) => s + (o.val || 0), 0);
  const avgOrderSize = totalOrders ? grossRevenue / totalOrders : 0;

  const byYear = {};
  orders.forEach(o => {
    if (!o.year) return;
    byYear[o.year] = (byYear[o.year] || 0) + (o.val || 0);
  });
  const revenueByYear = Object.keys(byYear).sort().map(y => ({ year: y, revenue: Math.round(byYear[y]) }));

  const byOcc = {};
  orders.forEach(o => { byOcc[o.occ] = (byOcc[o.occ] || 0) + 1; });
  const ordersByType = Object.entries(byOcc)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const byLead = {};
  orders.forEach(o => { byLead[o.lead] = (byLead[o.lead] || 0) + 1; });
  const ordersByLeadSource = Object.entries(byLead)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return { totalClients, totalOrders, newClients, repeatClients, grossRevenue, avgOrderSize, revenueByYear, ordersByType, ordersByLeadSource };
}

function computeUpcoming(data) {
  // "Upcoming" means: clients with a past order that happened in NEXT
  // calendar month (any year) — a forward-looking signal for who to reach
  // out to before that month arrives, not a look back at a month already
  // mostly over.
  const today = new Date();
  const targetMonth = (today.getMonth() + 1) % 12; // 0-indexed, next calendar month, wraps Dec -> Jan
  const seen = new Map();

  data.orders.forEach(o => {
    if (!o.date) return;
    const d = new Date(o.date + 'T00:00:00');
    if (d.getMonth() !== targetMonth) return;
    const existing = seen.get(o.k);
    if (!existing || o.date > existing.lastDate) {
      seen.set(o.k, {
        k: o.k, name: o.name, occ: o.occ,
        lastDate: o.date, lastVal: o.val, pkg: o.pkg,
      });
    }
  });

  return Array.from(seen.values()).sort((a, b) => a.lastDate.localeCompare(b.lastDate));
}

// ---------------------------------------------------------------------------
// Re-Engagement campaign — 3-email anniversary sequence for repeat clients
// ---------------------------------------------------------------------------
const ORDER_FORM_LINK = 'https://your-order-form-link-goes-here.com';

const CAMPAIGN_STAGE_ORDER = ['none', 'email1_sent', 'email2_sent', 'email3_sent'];
const CAMPAIGN_STAGE_LABELS = {
  none: 'Not Started',
  email1_sent: 'Email 1 Sent',
  email2_sent: 'Email 2 Sent',
  email3_sent: 'Email 3 Sent',
  replied_yes: 'Replied — Yes',
  replied_no: 'Replied — No',
};
// Days-before-anniversary threshold for each email in the sequence.
const CAMPAIGN_THRESHOLDS = { 1: 21, 2: 14, 3: 7 };

// For every repeat client, find the next occurrence of their last order's
// month/day (this year if still ahead, otherwise next year) and how many
// days out that is from today.
function computeAnniversaries(clients) {
  const today = new Date();
  const todayD = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return clients
    .filter(c => c.type === 'Repeat' && c.lastDate && c.email)
    .map(c => {
      const last = new Date(c.lastDate + 'T00:00:00');
      let anniv = new Date(todayD.getFullYear(), last.getMonth(), last.getDate());
      if (anniv < todayD) anniv = new Date(todayD.getFullYear() + 1, last.getMonth(), last.getDate());
      const daysUntil = Math.round((anniv - todayD) / 86400000);
      return {
        k: c.k,
        name: c.name,
        email: c.email,
        phone: c.phone,
        state: c.state,
        occasion: c.lastOcc || 'event',
        anniversaryISO: anniv.toISOString().slice(0, 10),
        daysUntil,
      };
    })
    .sort((a, b) => a.daysUntil - b.daysUntil);
}

// Given a client's current campaign stage, figure out which email (if any)
// is next, and whether today has crossed that email's send-window threshold.
function getCampaignAction(anniversary, stage) {
  const s = stage || 'none';
  if (s === 'replied_yes' || s === 'replied_no') {
    return { nextEmailNum: null, isDue: false, done: true };
  }
  const stageIdx = CAMPAIGN_STAGE_ORDER.indexOf(s);
  const idx = stageIdx === -1 ? 3 : stageIdx;
  const nextEmailNum = Math.min(idx + 1, 3);
  const isDue = idx < 3 && anniversary.daysUntil <= CAMPAIGN_THRESHOLDS[nextEmailNum];
  return { nextEmailNum: idx < 3 ? nextEmailNum : null, isDue, done: idx >= 3 };
}

// Renders the exact subject + body for a given email number in the sequence,
// with the client's first name and last occasion swapped into the merge fields.
// Default Re-Engagement copy, expressed as editable merge-tag templates —
// same format as custom campaigns, so both can share one editable-copy UI
// and one fill mechanism.
const REENGAGE_DEFAULT_EMAILS = [
  {
    subject: "Is there another {{occasion}} coming up? 🎈",
    body: `Hi {{firstName}},

Believe it or not, it's almost been a year since we popped in for your last {{occasion}}. Time flies!

If you've got another one on the calendar, we'd love to start planning early with you. Early birds get the best pick of dates, colors, and themes before our calendar fills up, and as a returning client, you're also holding 20% off whenever you're ready.

Just hit reply and let us know what's coming up, even a quick "yes" or "not this year" is perfect. If you're ready to lock it in now, jump straight to the order form:
${ORDER_FORM_LINK}

Talk soon,
The Big Pop'n Balloons Team`,
  },
  {
    subject: 'Still holding your spot and 20% off, {{firstName}}',
    body: `Hi {{firstName}},

Just floating this back to the top of your inbox. We're starting to fill up our calendar for this time of year, and we'd hate for you to miss out on your first-pick dates and designs if a {{occasion}} (or anything else!) is on the horizon.

Your 20% loyal client discount is still holding too, whenever you're ready to use it.

Grab your spot: ${ORDER_FORM_LINK}

No pressure if the timing's off, just let us know either way!

The Big Pop'n Balloons Team`,
  },
  {
    subject: 'Looks like the {{occasion}} is right around the corner!',
    body: `Hi {{firstName}},

This is the last nudge, promise! Based on last year, your {{occasion}} is coming up soon, and if you want it on our calendar, this is the week to grab your spot before dates and designs fill up.

Your 20% off is still there too if you book now.

${ORDER_FORM_LINK}

If now's not the right time, no worries at all, we'll be here whenever you're ready to celebrate next.

The Big Pop'n Balloons Team`,
  },
];

// ---------------------------------------------------------------------------
// Generic custom-campaign automation — same staged-email idea as
// Re-Engagement, but generalized to any campaign definition: N emails,
// spread evenly across a chosen length, counted from when each client
// was enrolled (campaign creation date) rather than an annual anniversary.
// ---------------------------------------------------------------------------

// Even default spacing across a length — used to pre-fill the day-offset
// inputs when the user picks a length/email count, but every value stays
// individually editable after that.
function computeCampaignThresholds(numEmails, lengthDays) {
  const arr = [];
  for (let i = 0; i < numEmails; i++) {
    arr.push(Math.round((i * lengthDays) / numEmails));
  }
  return arr;
}

function fillTemplate(str, data) {
  return (str || '').replace(/\{\{(\w+)\}\}/g, (m, key) => (data[key] !== undefined && data[key] !== '' ? data[key] : m));
}

function campaignStageOrder(numEmails) {
  return ['none', ...Array.from({ length: numEmails }, (_, i) => `email${i + 1}_sent`)];
}

function getGenericCampaignAction(daysSinceStart, thresholds, numEmails, stage) {
  const s = stage || 'none';
  if (s === 'replied_yes' || s === 'replied_no') {
    return { nextEmailNum: null, isDue: false, done: true };
  }
  const order = campaignStageOrder(numEmails);
  const idx = Math.max(0, order.indexOf(s));
  const nextEmailNum = Math.min(idx + 1, numEmails);
  const isDue = idx < numEmails && daysSinceStart >= thresholds[idx];
  return { nextEmailNum: idx < numEmails ? nextEmailNum : null, isDue, done: idx >= numEmails };
}

// Builds the due-tracking row list for one custom campaign. Two modes:
//
// "broadcast" — a one-time send to whoever matched the filters at creation
// time (audienceKeys is a fixed snapshot). Every client shares the same
// clock: day 0 is the campaign's creation date, for all of them, regardless
// of when they became a client. This is the right mode for "email everyone
// in Texas about the new arrangement, starting now."
//
// "rolling" — an ongoing campaign with no fixed roster. Audience is
// recomputed live against the filters every time (so new matching clients
// get swept in automatically), and each client's own clock starts from a
// date already on their record (first order or most recent order) rather
// than the campaign's creation date.
function computeCampaignRows(campaign, clients, activity) {
  const today = new Date();
  const todayD = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const thresholds = campaign.thresholds || computeCampaignThresholds(campaign.numEmails, campaign.lengthDays);

  let candidates;
  if (campaign.mode === 'rolling') {
    const field = campaign.triggerField || 'firstDate';
    candidates = clients
      .filter(c => c.email && c[field] && clientMatchesFilters(c, campaign.filters))
      .map(c => ({ client: c, startDate: c[field] }));
  } else {
    const byKey = {};
    clients.forEach(c => { byKey[c.k] = c; });
    candidates = (campaign.audienceKeys || [])
      .map(k => byKey[k])
      .filter(c => c && c.email)
      .map(c => ({ client: c, startDate: campaign.createdAt }));
  }

  return candidates
    .map(({ client: c, startDate }) => {
      const start = new Date(startDate + 'T00:00:00');
      const daysSinceStart = Math.round((todayD - start) / 86400000);
      const stage = (activity && activity[c.k]) || 'none';
      const action = getGenericCampaignAction(daysSinceStart, thresholds, campaign.numEmails, stage);
      return { k: c.k, name: c.name, email: c.email, occasion: c.lastOcc || 'event', daysSinceStart, stage, ...action };
    })
    .sort((a, b) => (b.isDue - a.isDue) || (a.name || '').localeCompare(b.name || ''));
}

// ---------------------------------------------------------------------------
// Lead Pipeline — separate from Customers entirely. Leads only enter here
// via the website/social lead form or the New Lead button; existing
// customers are never auto-added. A lead only becomes a customer once it's
// dragged to Closed Won.
// ---------------------------------------------------------------------------
const PIPELINE_STAGES = [
  { id: 'identified', label: 'Identified', color: COLORS.sky, blurb: 'Just came in — not yet contacted or vetted' },
  { id: 'qualified', label: 'Qualified', color: COLORS.lavender, blurb: 'Budget, date & needs confirmed — ready to quote' },
  { id: 'closed_won', label: 'Closed Won', color: COLORS.teal, blurb: 'Booked! Add to Customers once delivered' },
  { id: 'closed_lost', label: 'Closed Lost', color: COLORS.roseDeep, blurb: "Didn't convert — keep on file for later" },
];
const STAGE_BY_ID = Object.fromEntries(PIPELINE_STAGES.map(s => [s.id, s]));

const LEAD_SOURCE_OPTIONS = ['Referral', 'Facebook', 'Instagram', 'Google', 'Website', 'Walk-in/Phone', 'Other'];
const CLIENT_TYPE_OPTIONS = ['Family/Individual', 'Hotel', 'Event Center/Venue', 'School', 'Organization/Nonprofit', 'Corporate/Business', 'Other'];
const EVENT_TYPE_OPTIONS = ['Birthday', 'Graduation', 'Baby Shower', 'Wedding/Engagement', 'Corporate/Organization', 'Holiday', 'School/Team Event', 'Special Occasion'];

const newLeadId = () => 'lead-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
const nowISO = () => new Date().toISOString();

function makeLead(fields) {
  const ts = nowISO();
  return {
    id: newLeadId(),
    name: fields.name || 'Unnamed Lead',
    clientType: fields.clientType || 'Family/Individual',
    phone: fields.phone || '',
    email: fields.email || '',
    eventType: fields.eventType || 'Special Occasion',
    eventDate: fields.eventDate || '',
    address: fields.address || '',
    package: fields.package || '',
    colors: fields.colors || '',
    estValue: fields.estValue !== undefined && fields.estValue !== '' ? Number(fields.estValue) : 0,
    source: fields.source || 'Other',
    owner: fields.owner && fields.owner.trim() ? fields.owner.trim() : 'Unassigned',
    notes: fields.notes || '',
    nextStep: fields.nextStep || '',
    stage: 'identified',
    createdAt: ts,
    updatedAt: ts,
    stageHistory: [{ stage: 'identified', date: ts }],
  };
}

function computeLeadStats(leads) {
  const byStage = {};
  PIPELINE_STAGES.forEach(s => { byStage[s.id] = { count: 0, value: 0 }; });
  leads.forEach(l => {
    if (!byStage[l.stage]) byStage[l.stage] = { count: 0, value: 0 };
    byStage[l.stage].count += 1;
    byStage[l.stage].value += Number(l.estValue) || 0;
  });

  const active = leads.filter(l => l.stage === 'identified' || l.stage === 'qualified');
  const pipelineValue = active.reduce((s, l) => s + (Number(l.estValue) || 0), 0);
  const won = leads.filter(l => l.stage === 'closed_won');
  const lost = leads.filter(l => l.stage === 'closed_lost');
  const wonValue = won.reduce((s, l) => s + (Number(l.estValue) || 0), 0);
  const decided = won.length + lost.length;
  const winRate = decided ? Math.round((won.length / decided) * 100) : 0;

  const bySource = {};
  leads.forEach(l => { bySource[l.source || 'Other'] = (bySource[l.source || 'Other'] || 0) + 1; });
  const leadsBySource = Object.entries(bySource).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  const byStageChart = PIPELINE_STAGES.map(s => ({ name: s.label, value: byStage[s.id]?.count || 0, id: s.id }));

  const ownerMap = {};
  leads.forEach(l => {
    const name = l.owner && l.owner.trim() ? l.owner.trim() : 'Unassigned';
    if (!ownerMap[name]) ownerMap[name] = { owner: name, total: 0, active: 0, won: 0, lost: 0, pipelineValue: 0, wonValue: 0 };
    const o = ownerMap[name];
    o.total += 1;
    if (l.stage === 'identified' || l.stage === 'qualified') { o.active += 1; o.pipelineValue += Number(l.estValue) || 0; }
    if (l.stage === 'closed_won') { o.won += 1; o.wonValue += Number(l.estValue) || 0; }
    if (l.stage === 'closed_lost') o.lost += 1;
  });
  const byOwner = Object.values(ownerMap).map(o => ({
    ...o,
    winRate: (o.won + o.lost) ? Math.round((o.won / (o.won + o.lost)) * 100) : null,
  })).sort((a, b) => b.total - a.total);

  const byMonth = {};
  leads.forEach(l => {
    if (!l.createdAt) return;
    const m = l.createdAt.slice(0, 7);
    byMonth[m] = (byMonth[m] || 0) + 1;
  });
  const leadsByMonth = Object.keys(byMonth).sort().slice(-6).map(m => ({
    month: new Date(m + '-02T00:00:00').toLocaleString('en-US', { month: 'short' }),
    value: byMonth[m],
  }));

  return {
    total: leads.length, byStage, byStageChart, pipelineValue,
    wonCount: won.length, wonValue, lostCount: lost.length, winRate,
    leadsBySource, leadsByMonth, byOwner,
    avgDealSize: won.length ? wonValue / won.length : 0,
  };
}

// Consistent color + initials for an owner name, so the same rep always
// reads the same at a glance across cards, filters, and analytics.
const OWNER_PALETTE = [COLORS.rose, COLORS.lavender, COLORS.teal, COLORS.gold, COLORS.sky, COLORS.roseDeep, COLORS.lavenderDeep, COLORS.goldDeep];
function ownerColor(name) {
  if (!name || name === 'Unassigned') return COLORS.inkSoft;
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return OWNER_PALETTE[hash % OWNER_PALETTE.length];
}
function ownerInitials(name) {
  if (!name || name === 'Unassigned') return '—';
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
}

const daysSince = (iso) => {
  if (!iso) return 0;
  return Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24)));
};

// ---------------------------------------------------------------------------
// Closed-won leads become real customer records — this is what makes a won
// lead show up under Customers (and in Home page revenue/stats) instantly.
// ---------------------------------------------------------------------------
function leadToOrder(lead) {
  const phone = normalizePhone(lead.phone);
  const email = (lead.email || '').trim();
  const k = phone || (email ? email.toLowerCase() : '') || ('lead-' + lead.id);
  const dateStr = lead.eventDate || null;
  const year = dateStr ? parseInt(dateStr.slice(0, 4), 10) : null;
  return {
    id: 'won-' + lead.id,
    k,
    name: lead.name || 'Unnamed',
    phone,
    email,
    date: dateStr,
    occ: occasionBucket(lead.eventType),
    pkg: (lead.notes && lead.notes.trim()) ? lead.notes.trim().slice(0, 120) : 'Booked from Lead Pipeline',
    val: Number(lead.estValue) || 0,
    lead: lead.source || 'Unknown',
    ref: lead.owner && lead.owner !== 'Unassigned' ? `Closed by ${lead.owner}` : '',
    year,
    ts: nowISO(),
  };
}

// Raw row shape the live-sheet bridge expects for a POST — mirrors the shape
// normalizeLiveRow() reads back on the next GET sync, so a pushed order is
// picked up cleanly once the sheet has it.
function leadToSheetRow(lead) {
  return {
    ts: nowISO(),
    name: lead.name || 'Unnamed',
    email: lead.email || '',
    phone: lead.phone || '',
    eventDate: lead.eventDate || '',
    address: lead.address || '',
    occasion: lead.eventType || '',
    package: (lead.package && lead.package.trim())
      ? lead.package.trim().slice(0, 120)
      : ((lead.notes && lead.notes.trim()) ? lead.notes.trim().slice(0, 120) : 'Booked from Lead Pipeline'),
    colors: lead.colors || '',
    amount: Number(lead.estValue) || 0,
  };
}

// ---------------------------------------------------------------------------
// Decorative balloon garland (SVG) — signature visual motif
// ---------------------------------------------------------------------------
function BalloonGarland({ height = 120, seed = 1 }) {
  const palette = [COLORS.rose, COLORS.gold, COLORS.lavender, COLORS.teal, COLORS.sky, COLORS.roseDeep];
  const balloons = [];
  const n = 26;
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 100;
    const wobble = Math.sin((i + seed) * 1.7) * 10;
    const r = 9 + (Math.abs(Math.sin((i + seed) * 2.3)) * 7);
    const y = 32 + wobble + Math.sin((i + seed * 3) * 0.9) * 6;
    const color = palette[(i + seed) % palette.length];
    balloons.push({ x, y, r, color, key: i });
  }
  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ width: '100%', height, display: 'block' }}>
      <path d="M0,30 Q25,44 50,30 T100,30" fill="none" stroke={COLORS.line} strokeWidth="0.4" opacity="0.6" />
      {balloons.map(b => (
        <g key={b.key}>
          <ellipse cx={b.x} cy={b.y} rx={b.r * 0.62} ry={b.r} fill={b.color} opacity="0.94" />
          <ellipse cx={b.x - b.r * 0.18} cy={b.y - b.r * 0.35} rx={b.r * 0.18} ry={b.r * 0.26} fill="#ffffff" opacity="0.35" />
        </g>
      ))}
    </svg>
  );
}

function BalloonMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="9" cy="9" rx="6" ry="7.2" fill={COLORS.rose} />
      <ellipse cx="9" cy="9" rx="6" ry="7.2" fill="url(#g1)" opacity="0.5" />
      <path d="M9 16.2 L9 16.2" stroke={COLORS.ink} strokeWidth="0.6" />
      <path d="M9 16.2 C 9 18, 10.5 17.5, 10 20" stroke={COLORS.inkSoft} strokeWidth="0.6" fill="none" />
      <ellipse cx="16" cy="12" rx="5" ry="6" fill={COLORS.gold} opacity="0.95" />
      <path d="M16 18 C 16 19.6, 14.8 19.2, 15.2 21.5" stroke={COLORS.inkSoft} strokeWidth="0.6" fill="none" />
      <defs>
        <radialGradient id="g1" cx="0.35" cy="0.3" r="0.6">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// A small hand-built bouquet used as the sidebar logo mark — three overlapping
// balloons on strings, echoing the brand's real balloon-cluster photography
// without reproducing it.
function BalloonBouquetMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 24 C20 30, 17 30, 18 36" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" fill="none" />
      <path d="M13 22 C13 29, 10 29, 11 37" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" fill="none" />
      <path d="M27 22 C27 29, 30 29, 29 37" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" fill="none" />
      <ellipse cx="13" cy="15" rx="7.5" ry="9" fill={COLORS.rose} />
      <ellipse cx="27" cy="15" rx="7" ry="8.4" fill={COLORS.gold} />
      <ellipse cx="20" cy="10" rx="7.8" ry="9.4" fill={COLORS.lavender} />
      <ellipse cx="17.5" cy="7.5" rx="2.2" ry="3" fill="#ffffff" opacity="0.32" />
      <ellipse cx="11" cy="12.5" rx="1.9" ry="2.6" fill="#ffffff" opacity="0.3" />
      <ellipse cx="25" cy="12.5" rx="1.8" ry="2.4" fill="#ffffff" opacity="0.28" />
    </svg>
  );
}

// A taller decorative bouquet for empty space (sidebar footer, hero corners) —
// denser cluster, same restrained palette, no text or literal photography.
function BalloonBouquetTall({ width = 170, height = 320 }) {
  const clusters = [
    { cx: 55, cy: 60, r: 34, color: COLORS.rose },
    { cx: 108, cy: 40, r: 30, color: COLORS.gold },
    { cx: 90, cy: 95, r: 26, color: COLORS.lavender },
    { cx: 40, cy: 115, r: 22, color: COLORS.roseDeep },
    { cx: 120, cy: 105, r: 20, color: '#F4E9D8' },
    { cx: 65, cy: 145, r: 18, color: COLORS.lavenderDeep },
  ];
  return (
    <svg width={width} height={height} viewBox="0 0 170 320" fill="none" style={{ display: 'block' }}>
      {clusters.map((c, i) => (
        <path key={'s' + i} d={`M${c.cx},${c.cy + c.r * 0.7} C${c.cx},${190 + i * 12} ${c.cx - 6},${230 + i * 10} ${c.cx - 3},${300}`}
          stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" fill="none" />
      ))}
      {clusters.map((c, i) => (
        <g key={i}>
          <ellipse cx={c.cx} cy={c.cy} rx={c.r * 0.86} ry={c.r} fill={c.color} opacity="0.95" />
          <ellipse cx={c.cx - c.r * 0.28} cy={c.cy - c.r * 0.32} rx={c.r * 0.22} ry={c.r * 0.3} fill="#ffffff" opacity="0.3" />
        </g>
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------
function Sidebar({ page, setPage, orderCount, syncStatus, lastSynced, onOpenSettings, onRefresh }) {
  const items = [
    { id: 'home', label: 'Home Page', icon: Home },
    { id: 'crm', label: 'Customers', icon: Users },
    { id: 'pipeline', label: 'Pipeline', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'email-marketing', label: 'Email Marketing', icon: Mail },
    { id: 'social-media', label: 'Social Media', icon: Share2 },
    { id: 'reputation-builder', label: 'Reputation Builder', icon: Star },
  ];
  const statusColor = syncStatus === 'success' ? COLORS.teal : syncStatus === 'error' ? COLORS.rose : 'rgba(255,255,255,0.45)';
  const statusText = {
    success: `Synced ${lastSynced ? 'at ' + lastSynced : ''}`,
    error: 'Sync failed — showing last known data',
    loading: 'Syncing…',
    'not-configured': 'Live sync not connected',
  }[syncStatus] || 'Live sync not connected';

  const NavButton = ({ it }) => {
    const Icon = it.icon;
    const active = page === it.id;
    return (
      <button
        key={it.id}
        onClick={() => setPage(it.id)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 10, border: 'none',
          background: active ? 'linear-gradient(90deg, rgba(214,169,74,0.22), rgba(232,135,158,0.12))' : 'transparent',
          color: active ? COLORS.gold : 'rgba(255,255,255,0.78)',
          fontFamily: 'Manrope, sans-serif', fontWeight: active ? 700 : 500,
          fontSize: 14, cursor: 'pointer', textAlign: 'left', width: '100%',
          transition: 'background 0.15s, color 0.15s',
        }}
      >
        <Icon size={17} strokeWidth={2.2} />
        {it.label}
      </button>
    );
  };

  return (
    <div style={{
      width: 232, minWidth: 232,
      background: `linear-gradient(180deg, ${COLORS.navy} 0%, ${COLORS.navyDeep} 100%)`,
      color: '#fff', display: 'flex', flexDirection: 'column', padding: '24px 16px',
      position: 'sticky', top: 0, height: '100vh', boxSizing: 'border-box', overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px 28px 8px', position: 'relative', zIndex: 2 }}>
        <BalloonBouquetMark size={38} />
        <div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600, fontSize: 19, lineHeight: 1.1 }}>Big Pop'n</div>
          <div style={{ fontFamily: 'Playball, cursive', fontSize: 22, lineHeight: 1.1, color: COLORS.gold, marginTop: -2 }}>Balloons</div>
        </div>
      </div>
      <div style={{ fontSize: 11, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', padding: '0 12px 8px', textTransform: 'uppercase', position: 'relative', zIndex: 2 }}>
        Mission Control
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'relative', zIndex: 2 }}>
        {items.map(it => <NavButton key={it.id} it={it} />)}
      </nav>

      <div style={{ flex: 1, position: 'relative', minHeight: 40 }}>
        <div style={{ position: 'absolute', bottom: -26, left: -18, opacity: 0.92 }}>
          <BalloonBouquetTall width={168} height={300} />
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.12)', position: 'relative', zIndex: 2, background: `linear-gradient(180deg, transparent 0%, ${COLORS.navyDeep} 22%)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px', marginBottom: 8 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: statusColor, flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', fontFamily: 'Manrope, sans-serif' }}>{statusText}</span>
        </div>
        <div style={{ padding: '0 12px', display: 'flex', gap: 8 }}>
          <button
            onClick={onRefresh}
            style={{
              flex: 1, padding: '7px 0', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.06)', color: '#fff', fontFamily: 'Manrope, sans-serif',
              fontSize: 11.5, fontWeight: 600, cursor: 'pointer',
            }}
          >Refresh</button>
          <button
            onClick={onOpenSettings}
            style={{
              flex: 1, padding: '7px 0', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.06)', color: '#fff', fontFamily: 'Manrope, sans-serif',
              fontSize: 11.5, fontWeight: 600, cursor: 'pointer',
            }}
          >Connect sheet</button>
        </div>
        <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.35)', fontFamily: 'Manrope, sans-serif', padding: '10px 12px 0' }}>
          {orderCount} orders logged
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Settings modal — where the Google Sheet live-sync URL gets configured
// ---------------------------------------------------------------------------
function SettingsModal({ initialUrl, onSave, onClose }) {
  const [url, setUrl] = useState(initialUrl || '');
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(26,22,41,0.55)', zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: 18, padding: 28, maxWidth: 520, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, fontWeight: 700, color: COLORS.ink }}>Connect your live order sheet</div>
          <X size={18} color={COLORS.inkSoft} style={{ cursor: 'pointer' }} onClick={onClose} />
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: COLORS.inkSoft, marginTop: 8, lineHeight: 1.5 }}>
          Paste the Apps Script Web App URL from your order-form Google Sheet. Once connected, every new
          form submission shows up here automatically — no re-upload needed. See the setup guide for the
          one-time script to paste into your Sheet.
        </div>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://script.google.com/macros/s/.../exec"
          style={{
            width: '100%', marginTop: 16, padding: '10px 12px', borderRadius: 10,
            border: `1px solid ${COLORS.line}`, fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.ink,
          }}
        />
        <div style={{ display: 'flex', gap: 10, marginTop: 18, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{ padding: '9px 16px', borderRadius: 9, border: `1px solid ${COLORS.line}`, background: '#fff', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: COLORS.ink }}
          >Cancel</button>
          <button
            onClick={() => onSave(url.trim())}
            style={{ padding: '9px 18px', borderRadius: 9, border: 'none', background: COLORS.navy, color: '#fff', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
          >Save &amp; Sync</button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Reusable pieces
// ---------------------------------------------------------------------------
function KpiCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <div style={{
      background: COLORS.card, borderRadius: 18, padding: '24px 24px 20px',
      border: `1px solid ${COLORS.line}`, boxShadow: '0 2px 10px rgba(42,36,64,0.04)',
      flex: '1 1 220px', minWidth: 220, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, background: accent }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 16 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12, background: accent + '20',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon size={19} color={accent} strokeWidth={2.4} />
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13.5, color: COLORS.inkSoft, fontWeight: 600 }}>{label}</div>
      </div>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 600, color: COLORS.ink }}>{value}</div>
      {sub && <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: COLORS.inkSoft, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function DotMenu() {
  return (
    <div style={{ color: COLORS.inkSoft, opacity: 0.5, lineHeight: 0.5, letterSpacing: '1px', fontSize: 16, fontWeight: 700 }}>
      ⋮
    </div>
  );
}

function SectionCard({ title, subtitle, children, style, headerRight, showMenu }) {
  return (
    <div style={{
      background: COLORS.card, borderRadius: 16, padding: '18px 20px 20px',
      border: `1px solid ${COLORS.line}`, boxShadow: '0 2px 10px rgba(42,36,64,0.04)',
      ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16.5, fontWeight: 600, color: COLORS.ink }}>{title}</div>
          {subtitle && <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: COLORS.inkSoft, marginTop: 2 }}>{subtitle}</div>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {headerRight}
          {showMenu && <DotMenu />}
        </div>
      </div>
      <div style={{ marginTop: 12 }} />
      {children}
    </div>
  );
}

function TimeRangeSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 600, color: COLORS.ink,
        border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: '5px 10px',
        background: COLORS.cream, cursor: 'pointer', outline: 'none',
      }}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: COLORS.navy, color: '#fff', padding: '8px 12px', borderRadius: 8,
      fontFamily: 'Manrope, sans-serif', fontSize: 12.5, boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
    }}>
      <div style={{ fontWeight: 700, marginBottom: 2 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i}>{formatter ? formatter(p.value) : p.value}</div>
      ))}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Home Page
// ---------------------------------------------------------------------------
function HomePage({ stats, upcoming, goToUpcoming, goToCrmFilter, leadStats }) {
  const repeatPct = stats.totalClients ? Math.round((stats.repeatClients / stats.totalClients) * 100) : 0;
  const activeLeadCount = (leadStats?.byStage?.identified?.count || 0) + (leadStats?.byStage?.qualified?.count || 0);
  const monthName = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleString('en-US', { month: 'long' });
  const opportunityValue = upcoming.reduce((s, u) => s + (u.lastVal || 0), 0);

  const [revRange, setRevRange] = useState('all');
  const currentYear = new Date().getFullYear();
  const revenueData = revRange === 'all'
    ? stats.revenueByYear
    : stats.revenueByYear.filter(r => currentYear - parseInt(r.year, 10) < 3);

  return (
    <div>
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyDeep} 100%)`,
        borderRadius: 20, padding: '20px 32px', color: '#fff', overflow: 'hidden', marginBottom: 24,
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        border: `1px solid rgba(214,169,74,0.35)`,
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 480 }}>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, letterSpacing: '0.12em', color: COLORS.gold, textTransform: 'uppercase', fontWeight: 700 }}>
            Mission Control
          </div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 600, marginTop: 5, lineHeight: 1.1 }}>
            Big Pop'n Balloons
          </div>
          <div style={{ fontFamily: 'Playball, cursive', fontSize: 26, color: COLORS.gold, marginTop: 0, lineHeight: 1.1 }}>
            Business Overview
          </div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.72)', marginTop: 8 }}>
            Every order and lead, rolled up into one live view — so you know where the business stands at a glance.
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 1, flexShrink: 0, display: 'flex', alignItems: 'flex-end', gap: -20, opacity: 0.95 }}>
          <BalloonBouquetTall width={150} height={175} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
        <KpiCard icon={Users} label="Total Clients" value={stats.totalClients.toLocaleString()} sub={`${stats.repeatClients} repeat · ${stats.newClients} first-time`} accent={COLORS.lavender} />
        <KpiCard icon={PartyPopper} label="Total Orders" value={stats.totalOrders.toLocaleString()} sub="all-time, both source logs" accent={COLORS.rose} />
        <KpiCard icon={DollarSign} label="All-time Gross Revenue" value={money(stats.grossRevenue)} sub="from parsed package pricing" accent={COLORS.gold} />
        <KpiCard icon={TrendingUp} label="Avg. Order Size" value={money(stats.avgOrderSize)} sub="per order, all-time" accent={COLORS.lavenderDeep} />
        <KpiCard icon={Repeat} label="Repeat Client Rate" value={repeatPct + '%'} sub={`${stats.repeatClients} of ${stats.totalClients} clients`} accent={COLORS.roseDeep} />
        <KpiCard icon={Target} label="Leads in Pipeline" value={activeLeadCount.toLocaleString()} sub="identified + qualified, open" accent={COLORS.sky} />
        <KpiCard icon={Flame} label="Potential Pipeline Revenue" value={money(leadStats?.pipelineValue || 0)} sub="sum of open leads' estimated value" accent={COLORS.gold} />
      </div>

      <div
        onClick={goToUpcoming}
        style={{
          background: `linear-gradient(120deg, ${COLORS.navy} 0%, ${COLORS.navyDeep} 100%)`,
          borderRadius: 16, padding: '20px 24px', color: '#fff', marginBottom: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', boxShadow: '0 10px 26px rgba(31,17,48,0.35)',
          border: `1px solid rgba(214,169,74,0.3)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: 'rgba(214,169,74,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CalendarClock size={22} strokeWidth={2.1} color={COLORS.gold} />
          </div>
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 21, fontWeight: 600 }}>
              {upcoming.length} {monthName} Rebooking Opportunit{upcoming.length === 1 ? 'y' : 'ies'}
            </div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.rose, fontWeight: 700, marginTop: 2 }}>
              {money(opportunityValue)} estimated revenue opportunity
            </div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
              Clients with a past order in {monthName} — reach out now, before next month arrives.
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, background: COLORS.gold, color: COLORS.navyDeep,
          padding: '10px 16px', borderRadius: 999, fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13,
          flexShrink: 0, whiteSpace: 'nowrap',
        }}>
          View Opportunities <ArrowUpRight size={15} strokeWidth={2.6} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16, marginBottom: 16 }}>
        <SectionCard
          title="Gross Revenue by Year"
          subtitle="Estimated, from parsed order pricing"
          showMenu
          headerRight={
            <TimeRangeSelect
              value={revRange}
              onChange={setRevRange}
              options={[{ value: 'all', label: 'All Time' }, { value: 'recent', label: 'Last 3 Years' }]}
            />
          }
        >
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={revenueData} margin={{ left: -10, right: 10 }}>
              <CartesianGrid vertical={false} stroke={COLORS.line} />
              <XAxis dataKey="year" tick={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fill: COLORS.inkSoft }} axisLine={{ stroke: COLORS.line }} tickLine={false} />
              <YAxis tick={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, fill: COLORS.inkSoft }} axisLine={false} tickLine={false} tickFormatter={(v) => '$' + (v / 1000).toFixed(0) + 'k'} />
              <Tooltip content={<CustomTooltip formatter={(v) => money(v)} />} cursor={{ fill: COLORS.cream }} />
              <Bar dataKey="revenue" fill={COLORS.rose} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="New vs. Repeat Clients" subtitle="Click a slice to see that group" showMenu>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie
                data={[{ name: 'Repeat', value: stats.repeatClients }, { name: 'First-Time', value: stats.newClients }]}
                dataKey="value" nameKey="name" innerRadius={62} outerRadius={86} paddingAngle={3}
              >
                <Cell fill={COLORS.rose} style={{ cursor: 'pointer' }} onClick={() => goToCrmFilter('repeat')} />
                <Cell fill={COLORS.lavender} style={{ cursor: 'pointer' }} onClick={() => goToCrmFilter('first')} />
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" verticalAlign="bottom" align="center" wrapperStyle={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, paddingTop: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <SectionCard title="Orders by Event Type" subtitle="What clients are booking for" showMenu>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.ordersByType} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid horizontal={false} stroke={COLORS.line} />
              <XAxis type="number" tick={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, fill: COLORS.inkSoft }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" width={140} tick={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fill: COLORS.ink }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip formatter={(v) => v + ' orders'} />} cursor={{ fill: COLORS.cream }} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {stats.ordersByType.map((entry, i) => (
                  <Cell key={i} fill={OCC_COLORS[entry.name] || COLORS.inkSoft} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Orders by Lead Source" subtitle="Where clients are finding you" showMenu>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={stats.ordersByLeadSource} dataKey="value" nameKey="name" innerRadius={0} outerRadius={90} label={{ fontFamily: 'Manrope, sans-serif', fontSize: 11 }}>
                {stats.ordersByLeadSource.map((entry, i) => (
                  <Cell key={i} fill={LEAD_COLORS[entry.name] || COLORS.inkSoft} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip formatter={(v) => v + ' orders'} />} />
              <Legend iconType="circle" wrapperStyle={{ fontFamily: 'Manrope, sans-serif', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// CRM Page
// ---------------------------------------------------------------------------
const PAGE_SIZE = 20;

function ClientTypeBadge({ type }) {
  const isRepeat = type === 'Repeat';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 9px', borderRadius: 999, fontSize: 11, fontWeight: 700,
      fontFamily: 'Manrope, sans-serif',
      background: isRepeat ? 'rgba(239,138,160,0.15)' : 'rgba(167,150,217,0.15)',
      color: isRepeat ? COLORS.roseDeep : COLORS.lavender,
    }}>
      {isRepeat ? <Repeat size={11} /> : <UserPlus size={11} />}
      {type}
    </span>
  );
}

function StateBadge({ state }) {
  const isTexas = state === 'Texas';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 9px', borderRadius: 999, fontSize: 11, fontWeight: 700,
      fontFamily: 'Manrope, sans-serif',
      background: isTexas ? 'rgba(214,169,74,0.15)' : 'rgba(79,182,168,0.15)',
      color: isTexas ? COLORS.goldDeep : COLORS.teal,
    }}>
      <MapPin size={11} />
      {isTexas ? 'TX' : 'CA'}
    </span>
  );
}

function ColumnFilterSelect({ label, value, onChange, options }) {
  const active = value !== 'all';
  return (
    <div style={{ position: 'relative', width: '100%', minWidth: 0 }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        style={{
          fontFamily: 'Manrope, sans-serif', fontSize: 10.5, fontWeight: 700,
          color: active ? COLORS.ink : COLORS.inkSoft,
          border: `1px solid ${active ? COLORS.gold : 'transparent'}`,
          borderRadius: 6, padding: '2px 18px 2px 4px', background: active ? '#fff' : 'transparent',
          cursor: 'pointer', outline: 'none', width: '100%', minWidth: 0, boxSizing: 'border-box',
          textTransform: 'uppercase', letterSpacing: '0.03em',
          appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}
      >
        <option value="all">{label}</option>
        {options.map(o => <option key={o} value={o} style={{ textTransform: 'none', fontWeight: 500 }}>{o}</option>)}
      </select>
      <ChevronDown
        size={11} color={active ? COLORS.ink : COLORS.inkSoft}
        style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
      />
    </div>
  );
}


function CrmPage({ clients, orders, filter, setFilter, search, setSearch, lastContacted, updateLastContacted, expanded, setExpanded, upcomingKeys, typeFilter, setTypeFilter, stateFilter, setStateFilter, eventTypeFilter, setEventTypeFilter }) {
  const [pageNum, setPageNum] = useState(0);
  const upcomingMonthName = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleString('en-US', { month: 'long' });

  const upcomingSet = useMemo(() => new Set(upcomingKeys), [upcomingKeys]);

  const eventTypeOptions = useMemo(() => {
    const set = new Set(clients.map(c => c.lastOcc).filter(Boolean));
    return Array.from(set).sort();
  }, [clients]);

  const filtered = useMemo(() => {
    let list = clients;
    if (filter === 'repeat') list = list.filter(c => c.type === 'Repeat');
    if (filter === 'first') list = list.filter(c => c.type === 'First-Time');
    if (filter === 'upcoming') list = list.filter(c => upcomingSet.has(c.k));
    list = list.filter(c => clientMatchesFilters(c, { type: typeFilter, state: stateFilter, eventType: eventTypeFilter }));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(c =>
        (c.name || '').toLowerCase().includes(q) ||
        (c.phone || '').toLowerCase().includes(q) ||
        (c.email || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [clients, filter, search, upcomingSet, typeFilter, stateFilter, eventTypeFilter]);

  useEffect(() => { setPageNum(0); }, [filter, search, typeFilter, stateFilter, eventTypeFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice(pageNum * PAGE_SIZE, pageNum * PAGE_SIZE + PAGE_SIZE);

  const chips = [
    { id: 'all', label: `All (${clients.length})` },
    { id: 'repeat', label: `Repeat (${clients.filter(c => c.type === 'Repeat').length})` },
    { id: 'first', label: `First-Time (${clients.filter(c => c.type === 'First-Time').length})` },
    { id: 'upcoming', label: `Upcoming (${upcomingKeys.length})` },
  ];

  const handleEmailClick = (client) => {
    updateLastContacted(client.k, todayISO(), client.name);
  };

  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: COLORS.ink }}>Customers (CRM)</div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.inkSoft, marginTop: 2 }}>
          Contact info, order history, and lifetime value for every client on record.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, background: '#fff',
          border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: '8px 12px', flex: '1 1 260px', maxWidth: 340,
        }}>
          <Search size={15} color={COLORS.inkSoft} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name, phone, or email..."
            style={{
              border: 'none', outline: 'none', fontFamily: 'Manrope, sans-serif',
              fontSize: 13, width: '100%', background: 'transparent', color: COLORS.ink,
            }}
          />
          {search && (
            <X size={14} color={COLORS.inkSoft} style={{ cursor: 'pointer' }} onClick={() => setSearch('')} />
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {chips.map(chip => (
            <button
              key={chip.id}
              onClick={() => setFilter(chip.id)}
              style={{
                padding: '8px 14px', borderRadius: 999, border: `1px solid ${filter === chip.id ? 'transparent' : COLORS.line}`,
                background: filter === chip.id ? COLORS.navy : '#fff',
                color: filter === chip.id ? '#fff' : COLORS.ink,
                fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${COLORS.line}`, overflow: 'hidden', boxShadow: '0 2px 10px rgba(42,36,64,0.04)' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.3fr 1.05fr 0.85fr 0.8fr 0.5fr 0.75fr 0.75fr 1fr 0.95fr 30px',
          padding: '12px 18px', background: COLORS.cream, borderBottom: `1px solid ${COLORS.line}`,
          fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em',
        }}>
          <div>Client</div>
          <div>Contact</div>
          <div><ColumnFilterSelect label="Type" value={typeFilter} onChange={setTypeFilter} options={['Repeat', 'First-Time']} /></div>
          <div><ColumnFilterSelect label="State" value={stateFilter} onChange={setStateFilter} options={['Texas', 'California']} /></div>
          <div>Orders</div>
          <div>Lifetime Value</div>
          <div>Last Order</div>
          <div><ColumnFilterSelect label="Event Type" value={eventTypeFilter} onChange={setEventTypeFilter} options={eventTypeOptions} /></div>
          <div>Last Contacted</div>
          <div />
        </div>

        {pageItems.length === 0 && (
          <div style={{ padding: '40px 18px', textAlign: 'center', fontFamily: 'Manrope, sans-serif', color: COLORS.inkSoft, fontSize: 13 }}>
            No clients match this search or filter.
          </div>
        )}

        {pageItems.map(c => {
          const isOpen = expanded === c.k;
          const clientOrders = orders.filter(o => o.k === c.k).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
          const contacted = lastContacted[c.k] || '';
          const gmailHref = c.email ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(c.email)}&su=${encodeURIComponent('Big Pop\'n Balloons - checking in!')}` : null;
          return (
            <div key={c.k} style={{ borderBottom: `1px solid ${COLORS.line}` }}>
              <div
                onClick={() => setExpanded(isOpen ? null : c.k)}
                style={{
                  display: 'grid', gridTemplateColumns: '1.3fr 1.05fr 0.85fr 0.8fr 0.5fr 0.75fr 0.75fr 1fr 0.95fr 30px',
                  padding: '13px 18px', alignItems: 'center', cursor: 'pointer',
                  background: isOpen ? COLORS.cream : 'transparent',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13.5, fontWeight: 700, color: COLORS.ink }}>{c.name || 'Unnamed'}</div>
                  {upcomingSet.has(c.k) && (
                    <div style={{ fontSize: 10.5, color: COLORS.goldDeep, fontWeight: 700, marginTop: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
                      <CalendarClock size={11} /> Ordered in {upcomingMonthName} before
                    </div>
                  )}
                </div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: COLORS.inkSoft }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><PhoneIcon size={12} />{c.phone || '—'}</div>
                  {c.email ? (
                    <a
                      href={gmailHref} target="_blank" rel="noopener noreferrer"
                      onClick={(e) => { e.stopPropagation(); handleEmailClick(c); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, color: COLORS.sky, textDecoration: 'none', marginTop: 2 }}
                    >
                      <Mail size={12} />{c.email}
                    </a>
                  ) : <div style={{ marginTop: 2, opacity: 0.5 }}>no email</div>}
                </div>
                <div><ClientTypeBadge type={c.type} /></div>
                <div><StateBadge state={c.state} /></div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.ink, fontWeight: 600 }}>{c.orders}</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.goldDeep, fontWeight: 700 }}>{money(c.ltv)}</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: COLORS.inkSoft }}>{fmtDate(c.lastDate)}</div>
                <div>
                  <span style={{
                    fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                    background: (OCC_COLORS[c.lastOcc] || COLORS.inkSoft) + '22', color: OCC_COLORS[c.lastOcc] || COLORS.inkSoft,
                    fontFamily: 'Manrope, sans-serif', whiteSpace: 'nowrap',
                  }}>{c.lastOcc || 'Unspecified'}</span>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <input
                    type="date"
                    value={contacted}
                    onChange={(e) => updateLastContacted(c.k, e.target.value, c.name)}
                    style={{
                      border: `1px solid ${COLORS.line}`, borderRadius: 7, padding: '5px 7px',
                      fontFamily: 'Manrope, sans-serif', fontSize: 12, color: COLORS.ink, width: '100%',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <ChevronDown size={16} color={COLORS.inkSoft} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
                </div>
              </div>

              {isOpen && (
                <div style={{ padding: '4px 18px 18px 18px', background: COLORS.cream }}>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em', margin: '10px 0 8px' }}>
                    Order history ({clientOrders.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {clientOrders.map(o => (
                      <div key={o.id} style={{
                        background: '#fff', borderRadius: 10, padding: '10px 14px',
                        display: 'grid', gridTemplateColumns: '110px 140px 1fr 90px', gap: 10, alignItems: 'center',
                        border: `1px solid ${COLORS.line}`,
                      }}>
                        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 700, color: COLORS.ink }}>{fmtDate(o.date)}</div>
                        <div>
                          <span style={{
                            fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                            background: (OCC_COLORS[o.occ] || COLORS.inkSoft) + '22', color: OCC_COLORS[o.occ] || COLORS.inkSoft,
                            fontFamily: 'Manrope, sans-serif',
                          }}>{o.occ}</span>
                        </div>
                        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: COLORS.inkSoft }}>{o.pkg}</div>
                        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 700, color: COLORS.goldDeep, textAlign: 'right' }}>{money(o.val)}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 18, marginTop: 12, fontFamily: 'Manrope, sans-serif', fontSize: 12, color: COLORS.inkSoft }}>
                    <div>Lead source: <strong style={{ color: COLORS.ink }}>{c.lead}</strong></div>
                    {c.ref && <div>Referred by: <strong style={{ color: COLORS.ink }}>{c.ref}</strong></div>}
                    <div>Avg order: <strong style={{ color: COLORS.ink }}>{money(c.avg)}</strong></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <button
            disabled={pageNum === 0}
            onClick={() => setPageNum(p => Math.max(0, p - 1))}
            style={{
              padding: '7px 14px', borderRadius: 8, border: `1px solid ${COLORS.line}`, background: '#fff',
              fontFamily: 'Manrope, sans-serif', fontSize: 12.5, cursor: pageNum === 0 ? 'default' : 'pointer',
              opacity: pageNum === 0 ? 0.4 : 1,
            }}
          >Previous</button>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: COLORS.inkSoft }}>
            Page {pageNum + 1} of {totalPages}
          </div>
          <button
            disabled={pageNum >= totalPages - 1}
            onClick={() => setPageNum(p => Math.min(totalPages - 1, p + 1))}
            style={{
              padding: '7px 14px', borderRadius: 8, border: `1px solid ${COLORS.line}`, background: '#fff',
              fontFamily: 'Manrope, sans-serif', fontSize: 12.5, cursor: pageNum >= totalPages - 1 ? 'default' : 'pointer',
              opacity: pageNum >= totalPages - 1 ? 0.4 : 1,
            }}
          >Next</button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Re-Engagement Page
// ---------------------------------------------------------------------------
function StageBadge({ stage }) {
  const map = {
    none: { bg: 'rgba(122,110,148,0.12)', fg: COLORS.inkSoft },
    email1_sent: { bg: 'rgba(214,169,74,0.16)', fg: COLORS.goldDeep },
    email2_sent: { bg: 'rgba(214,169,74,0.28)', fg: COLORS.goldDeep },
    email3_sent: { bg: 'rgba(239,138,160,0.2)', fg: COLORS.roseDeep },
    replied_yes: { bg: 'rgba(94,163,140,0.18)', fg: COLORS.teal },
    replied_no: { bg: 'rgba(122,110,148,0.14)', fg: COLORS.inkSoft },
  };
  const s = map[stage] || map.none;
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 999,
      background: s.bg, color: s.fg, fontFamily: 'Manrope, sans-serif',
      fontSize: 11, fontWeight: 700,
    }}>
      {CAMPAIGN_STAGE_LABELS[stage] || 'Not Started'}
    </span>
  );
}

// Built-in Re-Engagement campaign, now shown as a collapsed summary card in
// the Active Campaigns list — same visual family as custom campaigns —
// which expands on click to reveal the full due-tracking table.
// Editable subject/body box used inside every campaign's expanded "Email
// Copy" section — same component whether it's Re-Engagement or a custom
// campaign, so editing feels identical everywhere.
function EditableEmailCopy({ index, subject, body, onChangeSubject, onChangeBody }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: 12 }}>
      <span style={{
        fontSize: 10.5, fontWeight: 700, padding: '2px 9px', borderRadius: 999,
        background: 'rgba(214,169,74,0.16)', color: COLORS.goldDeep, fontFamily: 'Manrope, sans-serif',
      }}>Email {index + 1}</span>
      <input
        value={subject}
        onChange={(e) => onChangeSubject(e.target.value)}
        placeholder="Subject line"
        style={{
          width: '100%', padding: '8px 10px', borderRadius: 8, border: `1px solid ${COLORS.line}`,
          fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 700, color: COLORS.ink, outline: 'none',
          boxSizing: 'border-box', marginTop: 8, marginBottom: 6,
        }}
      />
      <textarea
        value={body}
        onChange={(e) => onChangeBody(e.target.value)}
        placeholder="Email body"
        rows={5}
        style={{
          width: '100%', padding: '8px 10px', borderRadius: 8, border: `1px solid ${COLORS.line}`,
          fontFamily: 'Manrope, sans-serif', fontSize: 12, color: COLORS.ink, outline: 'none',
          boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.6,
        }}
      />
      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 10.5, color: COLORS.inkSoft, marginTop: 5 }}>
        Merge fields: <code style={{ background: COLORS.cream, padding: '1px 5px', borderRadius: 4 }}>{'{{firstName}}'}</code>{' '}
        <code style={{ background: COLORS.cream, padding: '1px 5px', borderRadius: 4 }}>{'{{occasion}}'}</code>{' '}
        <code style={{ background: COLORS.cream, padding: '1px 5px', borderRadius: 4 }}>{'{{campaignName}}'}</code>
      </div>
    </div>
  );
}

function ReEngagePage({ anniversaries, campaignStage, updateCampaignStage, onViewCrm, emails, updateEmail }) {
  const [expanded, setExpanded] = useState(false);
  const [dueOnly, setDueOnly] = useState(true);

  const rows = useMemo(() => {
    return anniversaries.map(a => {
      const stage = campaignStage[a.k] || 'none';
      const action = getCampaignAction(a, stage);
      return { ...a, stage, ...action };
    });
  }, [anniversaries, campaignStage]);

  const visibleRows = dueOnly ? rows.filter(r => r.isDue) : rows;
  const dueCount = rows.filter(r => r.isDue).length;

  const advanceStage = (k, name, nextEmailNum) => {
    const stageKey = ['none', 'email1_sent', 'email2_sent', 'email3_sent'][nextEmailNum];
    updateCampaignStage(k, stageKey, name);
  };

  return (
    <div style={{
      background: '#fff', borderRadius: 16, border: `1px solid ${COLORS.line}`,
      boxShadow: '0 2px 10px rgba(42,36,64,0.04)', marginBottom: 14, overflow: 'hidden',
    }}>
      <div
        onClick={() => setExpanded(v => !v)}
        style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, cursor: 'pointer' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16.5, fontWeight: 600, color: COLORS.ink }}>Client Re-Engagement Campaign</div>
            <span style={{
              fontSize: 10.5, fontWeight: 700, padding: '2px 9px', borderRadius: 999,
              background: 'rgba(79,182,168,0.16)', color: COLORS.teal, fontFamily: 'Manrope, sans-serif',
            }}>Ongoing</span>
            <span style={{
              fontSize: 10.5, fontWeight: 700, padding: '2px 9px', borderRadius: 999,
              background: 'rgba(214,169,74,0.16)', color: COLORS.goldDeep, fontFamily: 'Manrope, sans-serif',
            }}>3 emails</span>
            {dueCount > 0 && (
              <span style={{
                fontSize: 10.5, fontWeight: 700, padding: '2px 9px', borderRadius: 999,
                background: 'rgba(239,138,160,0.18)', color: COLORS.roseDeep, fontFamily: 'Manrope, sans-serif',
              }}>{dueCount} due now</span>
            )}
          </div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: COLORS.inkSoft, marginTop: 4 }}>
            {rows.length} client{rows.length === 1 ? '' : 's'} · Repeat clients with an email on file
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onViewCrm && onViewCrm({ type: 'Repeat', state: 'all', eventType: 'all' })}
            style={{
              padding: '8px 14px', borderRadius: 8, border: `1px solid ${COLORS.line}`, background: '#fff',
              fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', color: COLORS.ink,
            }}
          >View in CRM</button>
          <button
            onClick={() => setExpanded(v => !v)}
            style={{
              padding: '8px 10px', borderRadius: 8, border: `1px solid ${COLORS.line}`, background: '#fff',
              fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', color: COLORS.ink,
            }}
          ><ChevronDown size={13} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} /></button>
        </div>
      </div>

      {expanded && (
        <div style={{ borderTop: `1px solid ${COLORS.line}`, background: COLORS.cream, padding: '14px 22px 18px' }}>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 8 }}>
            Email Copy
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
            {emails.map((tpl, i) => (
              <EditableEmailCopy
                key={i} index={i} subject={tpl.subject} body={tpl.body}
                onChangeSubject={(v) => updateEmail(i, 'subject', v)}
                onChangeBody={(v) => updateEmail(i, 'body', v)}
              />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Recipients ({rows.length})
            </div>
            <button
              onClick={() => setDueOnly(v => !v)}
              style={{
                padding: '6px 12px', borderRadius: 999, border: `1px solid ${dueOnly ? 'transparent' : COLORS.line}`,
                background: dueOnly ? COLORS.navy : '#fff', color: dueOnly ? '#fff' : COLORS.ink,
                fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 600, cursor: 'pointer',
              }}
            >{dueOnly ? `Showing Due Only (${dueCount})` : `Showing All (${rows.length})`}</button>
          </div>

          <div style={{ background: '#fff', borderRadius: 12, border: `1px solid ${COLORS.line}`, overflow: 'hidden' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1.15fr 0.7fr 0.85fr 0.65fr 0.95fr 1.6fr',
              padding: '10px 14px', background: COLORS.cream, borderBottom: `1px solid ${COLORS.line}`,
              fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em',
            }}>
              <div>Client</div>
              <div>State</div>
              <div>Occasion</div>
              <div>Days Out</div>
              <div>Stage</div>
              <div>Action</div>
            </div>

            {visibleRows.length === 0 && (
              <div style={{ padding: '30px 14px', textAlign: 'center', fontFamily: 'Manrope, sans-serif', color: COLORS.inkSoft, fontSize: 13 }}>
                {dueOnly ? 'No one is due for an email right now — nice, you\'re caught up.' : 'No repeat clients with a valid email on file yet.'}
              </div>
            )}

            {visibleRows.map(r => {
              const template = r.nextEmailNum ? emails[r.nextEmailNum - 1] : null;
              const mergeData = { firstName: (r.name || '').trim().split(' ')[0] || 'there', occasion: (r.occasion || 'event').toLowerCase(), campaignName: 'Client Re-Engagement Campaign' };
              const email = template ? { subject: fillTemplate(template.subject, mergeData), body: fillTemplate(template.body, mergeData) } : null;
              return (
                <div key={r.k} style={{
                  display: 'grid', gridTemplateColumns: '1.15fr 0.7fr 0.85fr 0.65fr 0.95fr 1.6fr',
                  padding: '11px 14px', alignItems: 'center', borderBottom: `1px solid ${COLORS.line}`,
                }}>
                  <div>
                    <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 700, color: COLORS.ink }}>{r.name || 'Unnamed'}</div>
                    <div style={{ fontSize: 11, color: COLORS.inkSoft, marginTop: 1 }}>{r.email}</div>
                  </div>
                  <div>{r.state ? <StateBadge state={r.state} /> : <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: COLORS.inkSoft }}>—</span>}</div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: COLORS.inkSoft, textTransform: 'capitalize' }}>{r.occasion}</div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: r.isDue ? 700 : 500, color: r.isDue ? COLORS.roseDeep : COLORS.inkSoft }}>
                    {r.daysUntil}d
                  </div>
                  <div><StageBadge stage={r.stage} /></div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                    {email ? (
                      <>
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(r.email)}&su=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`}
                          target="_blank" rel="noopener noreferrer"
                          style={{
                            padding: '5px 10px', borderRadius: 7, border: 'none', background: COLORS.navy, color: '#fff',
                            fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap',
                          }}
                        >Gmail</a>
                        <button
                          onClick={() => advanceStage(r.k, r.name, r.nextEmailNum)}
                          style={{
                            padding: '5px 10px', borderRadius: 7, border: `1px solid ${COLORS.line}`, background: '#fff',
                            fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, cursor: 'pointer', color: COLORS.ink, whiteSpace: 'nowrap',
                          }}
                        >Mark Sent</button>
                      </>
                    ) : (
                      <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: COLORS.inkSoft }}>Sequence complete</span>
                    )}
                    <button
                      onClick={() => updateCampaignStage(r.k, 'replied_yes', r.name)}
                      title="Replied — Yes"
                      style={{
                        padding: '5px 8px', borderRadius: 7, border: 'none', background: COLORS.teal, color: '#fff',
                        fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                      }}
                    >✓</button>
                    <button
                      onClick={() => updateCampaignStage(r.k, 'replied_no', r.name)}
                      title="Replied — Not this year"
                      style={{
                        padding: '5px 8px', borderRadius: 7, border: `1px solid ${COLORS.line}`, background: '#fff', color: COLORS.inkSoft,
                        fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                      }}
                    >✕</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Campaign builder — create a new client segment/campaign using the same
// filter criteria as the CRM (Type, State, Event Type).
// ---------------------------------------------------------------------------
const CAMPAIGN_LENGTH_OPTIONS = [
  { value: 7, label: '1 Week' },
  { value: 14, label: '2 Weeks' },
  { value: 30, label: '1 Month' },
  { value: 42, label: '6 Weeks' },
  { value: 90, label: '3 Months' },
];

function FormSelect({ label, value, onChange, children }) {
  return (
    <div style={{ flex: '1 1 160px', minWidth: 150 }}>
      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 6 }}>
        {label}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%', padding: '9px 12px', borderRadius: 9, border: `1px solid ${COLORS.line}`,
          background: '#fff', fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.ink,
          cursor: 'pointer', outline: 'none', boxSizing: 'border-box',
        }}
      >
        {children}
      </select>
    </div>
  );
}

const DEFAULT_EMAIL_TEMPLATES = [
  { subject: 'A little something for {{firstName}} 🎈', body: 'Hi {{firstName}},\n\nWrite your first email here. Merge fields available: {{firstName}}, {{occasion}}, {{campaignName}}.\n\nThe Big Pop\'n Balloons Team' },
];

function ThresholdInput({ index, value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, color: COLORS.inkSoft }}>Due after</span>
      <input
        type="number" min={0} value={value}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value, 10) || 0))}
        style={{
          width: 56, padding: '4px 6px', borderRadius: 6, border: `1px solid ${COLORS.line}`,
          fontFamily: 'Manrope, sans-serif', fontSize: 12, color: COLORS.ink, textAlign: 'center', outline: 'none',
        }}
      />
      <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, color: COLORS.inkSoft }}>days</span>
    </div>
  );
}

function CampaignBuilder({ clients, onCreateCampaign }) {
  const [name, setName] = useState('');
  const [mode, setMode] = useState('broadcast'); // 'broadcast' | 'rolling'
  const [triggerField, setTriggerField] = useState('firstDate');
  const [lengthDays, setLengthDays] = useState(30);
  const [numEmails, setNumEmails] = useState(1);
  const [thresholds, setThresholds] = useState([0]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');
  const [emails, setEmails] = useState(DEFAULT_EMAIL_TEMPLATES);

  const eventTypeOptions = useMemo(() => {
    const set = new Set(clients.map(c => c.lastOcc).filter(Boolean));
    return Array.from(set).sort();
  }, [clients]);

  const filters = { type: typeFilter, state: stateFilter, eventType: eventTypeFilter };
  const audience = useMemo(() => clients.filter(c => clientMatchesFilters(c, filters)), [clients, typeFilter, stateFilter, eventTypeFilter]);

  const setNumEmailsClamped = (n) => {
    setNumEmails(n);
    setEmails(prev => {
      const next = prev.slice(0, n);
      while (next.length < n) next.push({ subject: '', body: '' });
      return next;
    });
    // Re-seed day offsets with even spacing as a starting point — still editable after.
    setThresholds(computeCampaignThresholds(n, lengthDays));
  };

  const setLengthDaysAndReseed = (days) => {
    setLengthDays(days);
    setThresholds(computeCampaignThresholds(numEmails, days));
  };

  const updateThreshold = (i, val) => {
    setThresholds(prev => prev.map((t, idx) => idx === i ? val : t));
  };

  const updateEmailField = (idx, field, value) => {
    setEmails(prev => prev.map((e, i) => i === idx ? { ...e, [field]: value } : e));
  };

  const emailsFilledOut = emails.slice(0, numEmails).every(e => e.subject.trim() && e.body.trim());
  const canCreate = name.trim().length > 0 && audience.length > 0 && emailsFilledOut;

  const handleCreate = () => {
    if (!canCreate) return;
    onCreateCampaign({
      id: 'campaign-' + Date.now(),
      name: name.trim(),
      mode,
      triggerField: mode === 'rolling' ? triggerField : null,
      lengthDays,
      numEmails,
      thresholds,
      filters,
      audienceKeys: mode === 'broadcast' ? audience.map(c => c.k) : [],
      audienceCount: audience.length,
      createdAt: new Date().toISOString().slice(0, 10),
      emails: emails.slice(0, numEmails),
    });
    setName('');
    setMode('broadcast');
    setTypeFilter('all');
    setStateFilter('all');
    setEventTypeFilter('all');
    setNumEmails(1);
    setThresholds([0]);
    setEmails(DEFAULT_EMAIL_TEMPLATES);
  };

  const startLabel = mode === 'rolling'
    ? (triggerField === 'lastDate' ? "client's most recent order" : "client's first order")
    : 'campaign start';

  return (
    <div style={{
      background: '#fff', borderRadius: 16, border: `1px solid ${COLORS.line}`, padding: '20px 22px 22px',
      boxShadow: '0 2px 10px rgba(42,36,64,0.04)',
    }}>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, fontWeight: 600, color: COLORS.ink }}>Create New Campaign</div>
      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: COLORS.inkSoft, marginTop: 2, marginBottom: 18 }}>
        Name it, choose how it's triggered, filter your client list, and write the copy — this campaign
        will track due dates and stages automatically, the same way Re-Engagement does.
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 6 }}>
          Campaign Name
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Fall Graduation Push"
          style={{
            width: '100%', padding: '9px 12px', borderRadius: 9, border: `1px solid ${COLORS.line}`,
            fontFamily: 'Manrope, sans-serif', fontSize: 13.5, color: COLORS.ink, outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 8 }}>
          Campaign Type
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={() => setMode('broadcast')}
            style={{
              flex: '1 1 220px', textAlign: 'left', padding: '12px 14px', borderRadius: 10, cursor: 'pointer',
              border: mode === 'broadcast' ? `1.5px solid ${COLORS.gold}` : `1px solid ${COLORS.line}`,
              background: mode === 'broadcast' ? 'rgba(214,169,74,0.08)' : '#fff',
            }}
          >
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 700, color: COLORS.ink }}>One-Time Send</div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, color: COLORS.inkSoft, marginTop: 2 }}>
              Send to everyone matching right now, starting today — no matter when they became a client.
            </div>
          </button>
          <button
            onClick={() => setMode('rolling')}
            style={{
              flex: '1 1 220px', textAlign: 'left', padding: '12px 14px', borderRadius: 10, cursor: 'pointer',
              border: mode === 'rolling' ? `1.5px solid ${COLORS.gold}` : `1px solid ${COLORS.line}`,
              background: mode === 'rolling' ? 'rgba(214,169,74,0.08)' : '#fff',
            }}
          >
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 700, color: COLORS.ink }}>Ongoing</div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, color: COLORS.inkSoft, marginTop: 2 }}>
              Keeps running — each client's own countdown starts from a date on their record.
            </div>
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        {mode === 'rolling' && (
          <FormSelect label="Starts Counting From" value={triggerField} onChange={setTriggerField}>
            <option value="firstDate">Client's First Order</option>
            <option value="lastDate">Client's Most Recent Order</option>
          </FormSelect>
        )}
        <FormSelect label="Default Spacing" value={lengthDays} onChange={(v) => setLengthDaysAndReseed(parseInt(v, 10))}>
          {CAMPAIGN_LENGTH_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </FormSelect>
        <FormSelect label="Number of Emails" value={numEmails} onChange={(v) => setNumEmailsClamped(parseInt(v, 10))}>
          {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Email{n === 1 ? '' : 's'}</option>)}
        </FormSelect>
        <FormSelect label="Client Type" value={typeFilter} onChange={setTypeFilter}>
          <option value="all">All Types</option>
          <option value="Repeat">Repeat</option>
          <option value="First-Time">First-Time</option>
        </FormSelect>
        <FormSelect label="State" value={stateFilter} onChange={setStateFilter}>
          <option value="all">All States</option>
          <option value="Texas">Texas</option>
          <option value="California">California</option>
        </FormSelect>
        <FormSelect label="Event Type" value={eventTypeFilter} onChange={setEventTypeFilter}>
          <option value="all">All Event Types</option>
          {eventTypeOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </FormSelect>
      </div>

      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 8 }}>
        Email Copy &amp; Timing
      </div>
      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, color: COLORS.inkSoft, marginBottom: 10 }}>
        "Default Spacing" pre-fills the day offsets below evenly — each one is still editable.
        Merge fields: <code style={{ background: COLORS.cream, padding: '1px 5px', borderRadius: 4 }}>{'{{firstName}}'}</code>{' '}
        <code style={{ background: COLORS.cream, padding: '1px 5px', borderRadius: 4 }}>{'{{occasion}}'}</code>{' '}
        <code style={{ background: COLORS.cream, padding: '1px 5px', borderRadius: 4 }}>{'{{campaignName}}'}</code>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
        {Array.from({ length: numEmails }).map((_, i) => (
          <div key={i} style={{ border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: 12, background: COLORS.cream }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{
                fontSize: 10.5, fontWeight: 700, padding: '2px 9px', borderRadius: 999,
                background: 'rgba(214,169,74,0.16)', color: COLORS.goldDeep, fontFamily: 'Manrope, sans-serif',
              }}>Email {i + 1}</span>
              <ThresholdInput index={i} value={thresholds[i] ?? 0} onChange={(v) => updateThreshold(i, v)} />
              <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: COLORS.inkSoft }}>
                {(thresholds[i] ?? 0) === 0 ? `— immediately from ${startLabel}` : `— after ${startLabel}`}
              </span>
            </div>
            <input
              value={emails[i]?.subject || ''}
              onChange={(e) => updateEmailField(i, 'subject', e.target.value)}
              placeholder="Subject line"
              style={{
                width: '100%', padding: '8px 10px', borderRadius: 8, border: `1px solid ${COLORS.line}`,
                fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.ink, outline: 'none',
                boxSizing: 'border-box', marginBottom: 6, background: '#fff',
              }}
            />
            <textarea
              value={emails[i]?.body || ''}
              onChange={(e) => updateEmailField(i, 'body', e.target.value)}
              placeholder="Email body"
              rows={4}
              style={{
                width: '100%', padding: '8px 10px', borderRadius: 8, border: `1px solid ${COLORS.line}`,
                fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: COLORS.ink, outline: 'none',
                boxSizing: 'border-box', resize: 'vertical', background: '#fff',
              }}
            />
          </div>
        ))}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        paddingTop: 16, borderTop: `1px solid ${COLORS.line}`,
      }}>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.ink }}>
          <strong style={{ color: audience.length > 0 ? COLORS.goldDeep : COLORS.inkSoft }}>{audience.length}</strong> matching client{audience.length === 1 ? '' : 's'}
          {mode === 'rolling' && <span style={{ color: COLORS.inkSoft }}> right now — this list will grow as more clients qualify</span>}
        </div>
        <button
          onClick={handleCreate}
          disabled={!canCreate}
          style={{
            padding: '10px 20px', borderRadius: 999, border: 'none',
            background: canCreate ? COLORS.navy : COLORS.line,
            color: canCreate ? '#fff' : COLORS.inkSoft,
            fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 700,
            cursor: canCreate ? 'pointer' : 'default',
          }}
        >
          Create Campaign
        </button>
      </div>
    </div>
  );
}

// A created campaign's card in the Active Campaigns list — expands into a
// due-tracking table just like Re-Engagement: preview the merged email,
// open it in Gmail, mark it sent. Stage is tracked per (campaign, client)
// and saved to the Sheet.
function CustomCampaignCard({ campaign, clients, activity, onUpdateStage, onView, onRemove, onUpdateEmail, onUpdateCampaign }) {
  const [expanded, setExpanded] = useState(false);
  const [dueOnly, setDueOnly] = useState(true);
  const [editingDetails, setEditingDetails] = useState(false);
  const [draftName, setDraftName] = useState(campaign.name);
  const [draftTypeFilter, setDraftTypeFilter] = useState(campaign.filters.type);
  const [draftStateFilter, setDraftStateFilter] = useState(campaign.filters.state);
  const [draftEventTypeFilter, setDraftEventTypeFilter] = useState(campaign.filters.eventType);
  const [draftThresholds, setDraftThresholds] = useState(campaign.thresholds);

  const eventTypeOptions = useMemo(() => {
    const set = new Set(clients.map(c => c.lastOcc).filter(Boolean));
    return Array.from(set).sort();
  }, [clients]);

  const startEditing = () => {
    setDraftName(campaign.name);
    setDraftTypeFilter(campaign.filters.type);
    setDraftStateFilter(campaign.filters.state);
    setDraftEventTypeFilter(campaign.filters.eventType);
    setDraftThresholds(campaign.thresholds);
    setEditingDetails(true);
    setExpanded(true);
  };

  const draftFilters = { type: draftTypeFilter, state: draftStateFilter, eventType: draftEventTypeFilter };
  const draftAudience = useMemo(() => clients.filter(c => clientMatchesFilters(c, draftFilters)), [clients, draftTypeFilter, draftStateFilter, draftEventTypeFilter]);

  const saveDetails = () => {
    const patch = {
      name: draftName.trim() || campaign.name,
      filters: draftFilters,
      thresholds: draftThresholds,
    };
    if (campaign.mode === 'broadcast') {
      patch.audienceKeys = draftAudience.map(c => c.k);
      patch.audienceCount = draftAudience.length;
    }
    onUpdateCampaign(campaign.id, patch);
    setEditingDetails(false);
  };

  const filterChips = [];
  if (campaign.filters.type !== 'all') filterChips.push(campaign.filters.type);
  if (campaign.filters.state !== 'all') filterChips.push(campaign.filters.state);
  if (campaign.filters.eventType !== 'all') filterChips.push(campaign.filters.eventType);

  const rows = useMemo(() => computeCampaignRows(campaign, clients, activity || {}), [campaign, clients, activity]);
  const dueCount = rows.filter(r => r.isDue).length;
  const visibleRows = dueOnly ? rows.filter(r => r.isDue) : rows;
  const liveCount = campaign.mode === 'rolling' ? rows.length : campaign.audienceCount;
  const modeLabel = campaign.mode === 'rolling' ? 'Ongoing' : 'One-Time';

  const advanceStage = (k, name, nextEmailNum) => {
    const order = campaignStageOrder(campaign.numEmails);
    onUpdateStage(campaign.id, k, order[nextEmailNum], name);
  };

  return (
    <div style={{
      background: '#fff', borderRadius: 16, border: `1px solid ${COLORS.line}`,
      boxShadow: '0 2px 10px rgba(42,36,64,0.04)', marginBottom: 14, overflow: 'hidden',
    }}>
      <div
        onClick={() => setExpanded(v => !v)}
        style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, cursor: 'pointer' }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16.5, fontWeight: 600, color: COLORS.ink }}>{campaign.name}</div>
            <span style={{
              fontSize: 10.5, fontWeight: 700, padding: '2px 9px', borderRadius: 999,
              background: campaign.mode === 'rolling' ? 'rgba(79,182,168,0.16)' : 'rgba(167,150,217,0.16)',
              color: campaign.mode === 'rolling' ? COLORS.teal : COLORS.lavenderDeep, fontFamily: 'Manrope, sans-serif',
            }}>{modeLabel}</span>
            <span style={{
              fontSize: 10.5, fontWeight: 700, padding: '2px 9px', borderRadius: 999,
              background: 'rgba(214,169,74,0.16)', color: COLORS.goldDeep, fontFamily: 'Manrope, sans-serif',
            }}>{campaign.numEmails} email{campaign.numEmails === 1 ? '' : 's'}</span>
            {dueCount > 0 && (
              <span style={{
                fontSize: 10.5, fontWeight: 700, padding: '2px 9px', borderRadius: 999,
                background: 'rgba(239,138,160,0.18)', color: COLORS.roseDeep, fontFamily: 'Manrope, sans-serif',
              }}>{dueCount} due now</span>
            )}
          </div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: COLORS.inkSoft, marginTop: 4 }}>
            {liveCount} client{liveCount === 1 ? '' : 's'}
            {filterChips.length > 0 ? ' · ' + filterChips.join(' · ') : ' · All clients'}
            {' · Created ' + fmtDate(campaign.createdAt)}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onView(campaign.filters)}
            style={{
              padding: '8px 14px', borderRadius: 8, border: `1px solid ${COLORS.line}`, background: '#fff',
              fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', color: COLORS.ink,
            }}
          >View in CRM</button>
          <button
            onClick={startEditing}
            style={{
              padding: '8px 14px', borderRadius: 8, border: `1px solid ${COLORS.line}`, background: '#fff',
              fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', color: COLORS.ink,
            }}
          >Edit Details</button>
          <button
            onClick={() => onRemove(campaign.id)}
            style={{
              padding: '8px 10px', borderRadius: 8, border: `1px solid ${COLORS.line}`, background: '#fff',
              fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', color: COLORS.inkSoft,
            }}
          ><X size={13} /></button>
          <button
            onClick={() => setExpanded(v => !v)}
            style={{
              padding: '8px 10px', borderRadius: 8, border: `1px solid ${COLORS.line}`, background: '#fff',
              fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', color: COLORS.ink,
            }}
          ><ChevronDown size={13} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} /></button>
        </div>
      </div>

      {expanded && (
        <div style={{ borderTop: `1px solid ${COLORS.line}`, background: COLORS.cream, padding: '14px 22px 18px' }}>
          {editingDetails && (
            <div style={{ background: '#fff', border: `1.5px solid ${COLORS.gold}`, borderRadius: 12, padding: 16, marginBottom: 18 }}>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 10 }}>
                Campaign Details
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, color: COLORS.inkSoft, marginBottom: 5 }}>Campaign Name</div>
                <input
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  style={{
                    width: '100%', padding: '8px 10px', borderRadius: 8, border: `1px solid ${COLORS.line}`,
                    fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.ink, outline: 'none', boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
                <FormSelect label="Client Type" value={draftTypeFilter} onChange={setDraftTypeFilter}>
                  <option value="all">All Types</option>
                  <option value="Repeat">Repeat</option>
                  <option value="First-Time">First-Time</option>
                </FormSelect>
                <FormSelect label="State" value={draftStateFilter} onChange={setDraftStateFilter}>
                  <option value="all">All States</option>
                  <option value="Texas">Texas</option>
                  <option value="California">California</option>
                </FormSelect>
                <FormSelect label="Event Type" value={draftEventTypeFilter} onChange={setDraftEventTypeFilter}>
                  <option value="all">All Event Types</option>
                  {eventTypeOptions.map(o => <option key={o} value={o}>{o}</option>)}
                </FormSelect>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                {Array.from({ length: campaign.numEmails }).map((_, i) => (
                  <ThresholdInput
                    key={i} index={i} value={draftThresholds[i] ?? 0}
                    onChange={(v) => setDraftThresholds(prev => prev.map((t, idx) => idx === i ? v : t))}
                  />
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: COLORS.ink }}>
                  <strong style={{ color: COLORS.goldDeep }}>{draftAudience.length}</strong> matching client{draftAudience.length === 1 ? '' : 's'}
                  {campaign.mode === 'broadcast' && <span style={{ color: COLORS.inkSoft }}> — saving will refresh the enrolled list to this</span>}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => setEditingDetails(false)}
                    style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${COLORS.line}`, background: '#fff', fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', color: COLORS.ink }}
                  >Cancel</button>
                  <button
                    onClick={saveDetails}
                    style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: COLORS.navy, color: '#fff', fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}
                  >Save Changes</button>
                </div>
              </div>
            </div>
          )}

          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 8 }}>
            Email Copy
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
            {campaign.emails.map((tpl, i) => (
              <EditableEmailCopy
                key={i} index={i} subject={tpl.subject} body={tpl.body}
                onChangeSubject={(v) => onUpdateEmail(campaign.id, i, 'subject', v)}
                onChangeBody={(v) => onUpdateEmail(campaign.id, i, 'body', v)}
              />
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              Recipients ({rows.length})
            </div>
            <button
              onClick={() => setDueOnly(v => !v)}
              style={{
                padding: '6px 12px', borderRadius: 999, border: `1px solid ${dueOnly ? 'transparent' : COLORS.line}`,
                background: dueOnly ? COLORS.navy : '#fff', color: dueOnly ? '#fff' : COLORS.ink,
                fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 600, cursor: 'pointer',
              }}
            >{dueOnly ? `Showing Due Only (${dueCount})` : `Showing All (${rows.length})`}</button>
          </div>

          <div style={{ background: '#fff', borderRadius: 12, border: `1px solid ${COLORS.line}`, overflow: 'hidden' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1.3fr 1fr 0.7fr 1.6fr',
              padding: '10px 14px', background: COLORS.cream, borderBottom: `1px solid ${COLORS.line}`,
              fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em',
            }}>
              <div>Client</div>
              <div>Occasion</div>
              <div>Stage</div>
              <div>Action</div>
            </div>

            {visibleRows.length === 0 && (
              <div style={{ padding: '24px 0', textAlign: 'center', fontFamily: 'Manrope, sans-serif', color: COLORS.inkSoft, fontSize: 13 }}>
                {dueOnly ? 'No one is due for an email right now.' : 'No clients with a valid email matched this campaign.'}
              </div>
            )}

            {visibleRows.map(r => {
              const template = r.nextEmailNum ? campaign.emails[r.nextEmailNum - 1] : null;
              const mergeData = { firstName: (r.name || '').trim().split(' ')[0] || 'there', occasion: (r.occasion || 'event').toLowerCase(), campaignName: campaign.name };
              const email = template ? { subject: fillTemplate(template.subject, mergeData), body: fillTemplate(template.body, mergeData) } : null;
              return (
                <div key={r.k} style={{
                  display: 'grid', gridTemplateColumns: '1.3fr 1fr 0.7fr 1.6fr',
                  padding: '11px 14px', alignItems: 'center', borderBottom: `1px solid ${COLORS.line}`,
                }}>
                  <div>
                    <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 700, color: COLORS.ink }}>{r.name || 'Unnamed'}</div>
                    <div style={{ fontSize: 11, color: COLORS.inkSoft }}>{r.email}</div>
                  </div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: COLORS.inkSoft, textTransform: 'capitalize' }}>{r.occasion}</div>
                  <div><StageBadge stage={r.stage} /></div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                    {email ? (
                      <>
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(r.email)}&su=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`}
                          target="_blank" rel="noopener noreferrer"
                          style={{
                            padding: '5px 10px', borderRadius: 7, border: 'none', background: COLORS.navy, color: '#fff',
                            fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', whiteSpace: 'nowrap',
                          }}
                        >Gmail</a>
                        <button
                          onClick={() => advanceStage(r.k, r.name, r.nextEmailNum)}
                          style={{
                            padding: '5px 10px', borderRadius: 7, border: `1px solid ${COLORS.line}`, background: '#fff',
                            fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, cursor: 'pointer', color: COLORS.ink, whiteSpace: 'nowrap',
                          }}
                        >Mark Sent</button>
                      </>
                    ) : (
                      <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: COLORS.inkSoft }}>Sequence complete</span>
                    )}
                    <button
                      onClick={() => onUpdateStage(campaign.id, r.k, 'replied_yes', r.name)}
                      title="Replied"
                      style={{
                        padding: '5px 8px', borderRadius: 7, border: 'none', background: COLORS.teal, color: '#fff',
                        fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                      }}
                    >✓</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Email Marketing (page-level wrapper) — houses Active Campaigns (built-in
// Re-Engagement plus any custom ones) and the campaign builder.
// ---------------------------------------------------------------------------
function EmailMarketingPage({ anniversaries, campaignStage, updateCampaignStage, clients, customCampaigns, campaignActivity, onCreateCampaign, onRemoveCampaign, onViewCampaign, onUpdateCampaignActivity, reEngageEmails, onUpdateReEngageEmail, onUpdateCampaignEmail, onUpdateCampaign }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: COLORS.ink }}>Email Marketing</div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.inkSoft, marginTop: 2 }}>
          Automated and one-off campaigns for staying in touch with your client list.
        </div>
      </div>

      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600, color: COLORS.ink, marginBottom: 14 }}>
        Active Campaigns
      </div>

      <div style={{ marginBottom: 8 }}>
        <ReEngagePage anniversaries={anniversaries} campaignStage={campaignStage} updateCampaignStage={updateCampaignStage} onViewCrm={onViewCampaign} emails={reEngageEmails} updateEmail={onUpdateReEngageEmail} />
        {customCampaigns.map(c => (
          <CustomCampaignCard
            key={c.id} campaign={c} clients={clients}
            activity={campaignActivity[c.id] || {}}
            onUpdateStage={onUpdateCampaignActivity}
            onView={onViewCampaign} onRemove={onRemoveCampaign}
            onUpdateEmail={onUpdateCampaignEmail}
            onUpdateCampaign={onUpdateCampaign}
          />
        ))}
      </div>

      <div style={{ marginTop: 80 }}>
        <CampaignBuilder clients={clients} onCreateCampaign={onCreateCampaign} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Social Media (placeholder — reserved for future build-out)
// ---------------------------------------------------------------------------
function SocialMediaPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: COLORS.ink }}>Social Media</div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.inkSoft, marginTop: 2 }}>
          Coming soon.
        </div>
      </div>
      <div style={{
        background: '#fff', borderRadius: 16, border: `1px solid ${COLORS.line}`,
        padding: '64px 40px', textAlign: 'center', boxShadow: '0 2px 10px rgba(42,36,64,0.04)',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16, background: COLORS.lavender + '20',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
        }}>
          <Sparkles size={26} color={COLORS.lavender} strokeWidth={2} />
        </div>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, fontWeight: 600, color: COLORS.ink, marginBottom: 8 }}>
          Nothing here yet
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.inkSoft, maxWidth: 380, margin: '0 auto', lineHeight: 1.6 }}>
          This is reserved for post scheduling, content ideas, or performance tracking across Instagram and Facebook — whenever you're ready to build it out.
        </div>
      </div>
    </div>
  );
}

function ReputationBuilderPage({ reviewRequests, syncStatus }) {
  const list = useMemo(() => {
    return Object.entries(reviewRequests || {}).map(([ts, r]) => ({ ts, ...r }))
      .sort((a, b) => (b.eventDate || '').localeCompare(a.eventDate || ''));
  }, [reviewRequests]);

  const parseSentDate = (val) => {
    if (!val) return null;
    const m = String(val).match(/Yes - (.+)$/);
    if (!m) return null;
    const d = new Date(m[1]);
    return isNaN(d.getTime()) ? null : d;
  };

  const totalSent = list.filter(r => r.emailSent || r.textSent).length;
  const emailsSent = list.filter(r => r.emailSent).length;
  const textsSent = list.filter(r => r.textSent).length;
  const sevenDaysAgo = new Date(); sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const sentThisWeek = list.filter(r => {
    const d = parseSentDate(r.emailSent) || parseSentDate(r.textSent);
    return d && d >= sevenDaysAgo;
  }).length;

  const notConnected = list.length === 0 && (syncStatus === 'not-configured' || syncStatus === 'error');

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: COLORS.ink }}>Reputation Builder</div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.inkSoft, marginTop: 2 }}>
          Automated Google review requests, sent the day after each Texas client's event.
        </div>
      </div>

      {notConnected ? (
        <div style={{
          background: '#fff', borderRadius: 16, border: `1px solid ${COLORS.line}`,
          padding: '64px 40px', textAlign: 'center', boxShadow: '0 2px 10px rgba(42,36,64,0.04)',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: COLORS.gold + '20',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
          }}>
            <Star size={26} color={COLORS.goldDeep} strokeWidth={2} />
          </div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, fontWeight: 600, color: COLORS.ink, marginBottom: 8 }}>
            Not connected yet
          </div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.inkSoft, maxWidth: 420, margin: '0 auto', lineHeight: 1.6 }}>
            Connect your live Google Sheet (bottom of the sidebar) to see review-request activity here once
            the automation is deployed and has sent at least one request.
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
            <KpiCard icon={Star} label="Total Requests Sent" value={totalSent.toLocaleString()} sub="email or text, all-time" accent={COLORS.gold} />
            <KpiCard icon={CalendarClock} label="Sent This Week" value={sentThisWeek.toLocaleString()} sub="last 7 days" accent={COLORS.roseDeep} />
            <KpiCard icon={Mail} label="Emails Sent" value={emailsSent.toLocaleString()} sub="all-time" accent={COLORS.sky} />
            <KpiCard icon={PhoneIcon} label="Texts Sent" value={textsSent.toLocaleString()} sub="all-time, Texas clients only" accent={COLORS.teal} />
          </div>

          <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${COLORS.line}`, overflow: 'hidden', boxShadow: '0 2px 10px rgba(42,36,64,0.04)' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1.3fr 0.9fr 0.6fr 1fr 1fr',
              padding: '12px 18px', background: COLORS.cream, borderBottom: `1px solid ${COLORS.line}`,
              fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em',
            }}>
              <div>Client</div>
              <div>Event Date</div>
              <div>State</div>
              <div>Email</div>
              <div>Text</div>
            </div>
            {list.length === 0 && (
              <div style={{ padding: '30px 18px', textAlign: 'center', fontFamily: 'Manrope, sans-serif', color: COLORS.inkSoft, fontSize: 13 }}>
                No review requests sent yet.
              </div>
            )}
            {list.map(r => (
              <div key={r.ts} style={{
                display: 'grid', gridTemplateColumns: '1.3fr 0.9fr 0.6fr 1fr 1fr',
                padding: '11px 18px', alignItems: 'center', borderBottom: `1px solid ${COLORS.line}`,
              }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600, color: COLORS.ink }}>{r.name || 'Unnamed'}</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: COLORS.inkSoft }}>{fmtDate(r.eventDate)}</div>
                <div>{r.state === 'TX' ? <StateBadge state="Texas" /> : r.state === 'CA' ? <StateBadge state="California" /> : <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: COLORS.inkSoft }}>—</span>}</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: r.emailSent ? COLORS.teal : COLORS.inkSoft, fontWeight: r.emailSent ? 700 : 500 }}>
                  {r.emailSent || 'Not sent'}
                </div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: r.textSent ? COLORS.teal : COLORS.inkSoft, fontWeight: r.textSent ? 700 : 500 }}>
                  {r.textSent || 'Not sent'}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lead Pipeline UI
// ---------------------------------------------------------------------------
function LeadStageBadge({ stageId, size = 'sm' }) {
  const s = STAGE_BY_ID[stageId];
  if (!s) return null;
  const small = size === 'sm';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: small ? '3px 9px' : '5px 12px', borderRadius: 999,
      fontSize: small ? 11 : 12.5, fontWeight: 700, fontFamily: 'Manrope, sans-serif',
      background: s.color + '1E', color: s.color,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color }} />
      {s.label}
    </span>
  );
}

function FieldLabel({ children }) {
  return (
    <div style={{
      fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, color: COLORS.inkSoft,
      textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 5,
    }}>{children}</div>
  );
}

const inputStyle = {
  width: '100%', padding: '9px 11px', borderRadius: 9, border: `1px solid ${COLORS.line}`,
  fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.ink, background: '#fff', outline: 'none',
};

function LeadFormFields({ form, setForm, ownerOptions = [] }) {
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      <div style={{ gridColumn: '1 / -1' }}>
        <FieldLabel>Lead / Contact Name *</FieldLabel>
        <input style={inputStyle} value={form.name} onChange={set('name')} placeholder="e.g. Sarah Lee, or Hilton Garden Inn" />
      </div>
      <div>
        <FieldLabel>Lead Owner</FieldLabel>
        <input style={inputStyle} value={form.owner} onChange={set('owner')} placeholder="Who's working this lead?" list="owner-options" />
        <datalist id="owner-options">
          {ownerOptions.map(o => <option key={o} value={o} />)}
        </datalist>
      </div>
      <div>
        <FieldLabel>Client Type</FieldLabel>
        <select style={inputStyle} value={form.clientType} onChange={set('clientType')}>
          {CLIENT_TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <FieldLabel>Lead Source</FieldLabel>
        <select style={inputStyle} value={form.source} onChange={set('source')}>
          {LEAD_SOURCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <FieldLabel>Phone</FieldLabel>
        <input style={inputStyle} value={form.phone} onChange={set('phone')} placeholder="(555) 555-5555" />
      </div>
      <div>
        <FieldLabel>Email</FieldLabel>
        <input style={inputStyle} value={form.email} onChange={set('email')} placeholder="name@email.com" />
      </div>
      <div>
        <FieldLabel>Event Type</FieldLabel>
        <select style={inputStyle} value={form.eventType} onChange={set('eventType')}>
          {EVENT_TYPE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <FieldLabel>Event Date</FieldLabel>
        <input type="date" style={inputStyle} value={form.eventDate} onChange={set('eventDate')} />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <FieldLabel>Estimated Order Value ($)</FieldLabel>
        <input type="number" min="0" style={inputStyle} value={form.estValue} onChange={set('estValue')} placeholder="285" />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <FieldLabel>Next Step</FieldLabel>
        <input style={inputStyle} value={form.nextStep} onChange={set('nextStep')} placeholder="e.g. Send quote by Friday" />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <FieldLabel>Notes</FieldLabel>
        <textarea
          style={{ ...inputStyle, minHeight: 74, resize: 'vertical', fontFamily: 'Manrope, sans-serif' }}
          value={form.notes} onChange={set('notes')} placeholder="How they found us, what they're picturing, budget signals..."
        />
      </div>
    </div>
  );
}

const EMPTY_LEAD_FORM = { name: '', clientType: 'Family/Individual', phone: '', email: '', eventType: 'Special Occasion', eventDate: '', estValue: '', source: 'Referral', owner: '', notes: '', nextStep: '' };

function NewLeadModal({ onSave, onClose, ownerOptions }) {
  const [form, setForm] = useState(EMPTY_LEAD_FORM);
  const canSave = form.name.trim().length > 0;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,22,41,0.55)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 18, padding: 26, maxWidth: 560, width: '100%', maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: COLORS.ink }}>New Lead</div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: COLORS.inkSoft, marginTop: 2 }}>Goes straight into the Identified column.</div>
          </div>
          <X size={18} color={COLORS.inkSoft} style={{ cursor: 'pointer' }} onClick={onClose} />
        </div>
        <div style={{ marginTop: 16 }}>
          <LeadFormFields form={form} setForm={setForm} ownerOptions={ownerOptions} />
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '9px 16px', borderRadius: 9, border: `1px solid ${COLORS.line}`, background: '#fff', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', color: COLORS.ink }}>Cancel</button>
          <button
            disabled={!canSave}
            onClick={() => canSave && onSave(form)}
            style={{ padding: '9px 18px', borderRadius: 9, border: 'none', background: canSave ? COLORS.navy : COLORS.line, color: '#fff', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 700, cursor: canSave ? 'pointer' : 'default' }}
          >Add Lead</button>
        </div>
      </div>
    </div>
  );
}

function OwnerAvatar({ name, size = 22 }) {
  const c = ownerColor(name);
  return (
    <div
      title={name || 'Unassigned'}
      style={{
        width: size, height: size, borderRadius: '50%', background: c + '22', color: c,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        fontFamily: 'Manrope, sans-serif', fontSize: size * 0.42, fontWeight: 800,
        border: `1.5px solid ${c}55`,
      }}
    >{ownerInitials(name)}</div>
  );
}

function LeadDetailModal({ lead, onClose, onUpdate, onDelete, onMoveStage, ownerOptions = [], convertedOrders = [] }) {
  const [notes, setNotes] = useState(lead.notes || '');
  const [nextStep, setNextStep] = useState(lead.nextStep || '');
  const [owner, setOwner] = useState(lead.owner || 'Unassigned');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const gmailHref = lead.email ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lead.email)}&su=${encodeURIComponent("Big Pop'n Balloons - following up!")}` : null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,22,41,0.55)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 18, padding: 26, maxWidth: 620, width: '100%', maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, minWidth: 0 }}>
            <OwnerAvatar name={lead.owner} size={40} />
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: COLORS.ink }}>{lead.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                <LeadStageBadge stageId={lead.stage} size="md" />
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: COLORS.inkSoft, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Building2 size={12} /> {lead.clientType}
                </span>
              </div>
            </div>
          </div>
          <X size={18} color={COLORS.inkSoft} style={{ cursor: 'pointer', flexShrink: 0 }} onClick={onClose} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 20 }}>
          <div>
            <FieldLabel>Lead Owner</FieldLabel>
            <input
              style={inputStyle} value={owner} list="owner-options-detail"
              onChange={(e) => setOwner(e.target.value)}
              onBlur={() => onUpdate(lead.id, { owner: owner.trim() || 'Unassigned' })}
              placeholder="Who's working this lead?"
            />
            <datalist id="owner-options-detail">
              {ownerOptions.map(o => <option key={o} value={o} />)}
            </datalist>
          </div>
          <div>
            <FieldLabel>Phone</FieldLabel>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.ink, display: 'flex', alignItems: 'center', gap: 6 }}>
              <PhoneIcon size={13} color={COLORS.inkSoft} /> {lead.phone || '—'}
            </div>
          </div>
          <div>
            <FieldLabel>Email</FieldLabel>
            {lead.email ? (
              <a href={gmailHref} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.sky, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Mail size={13} /> {lead.email}
              </a>
            ) : <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.ink, opacity: 0.5 }}>—</div>}
          </div>
          <div>
            <FieldLabel>Event</FieldLabel>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.ink }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: (OCC_COLORS[lead.eventType] || COLORS.inkSoft) + '22', color: OCC_COLORS[lead.eventType] || COLORS.inkSoft }}>{lead.eventType}</span>
              {lead.eventDate && <span style={{ marginLeft: 8, color: COLORS.inkSoft }}>{fmtDate(lead.eventDate)}</span>}
            </div>
          </div>
          <div>
            <FieldLabel>Estimated Value</FieldLabel>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 15, fontWeight: 700, color: COLORS.goldDeep }}>{money(lead.estValue)}</div>
          </div>
          <div>
            <FieldLabel>Source</FieldLabel>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 999, background: (LEAD_COLORS[lead.source] || COLORS.inkSoft) + '22', color: LEAD_COLORS[lead.source] || COLORS.inkSoft, fontFamily: 'Manrope, sans-serif' }}>{lead.source}</span>
          </div>
          <div>
            <FieldLabel>Created</FieldLabel>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.inkSoft }}>{fmtDate(lead.createdAt.slice(0, 10))}</div>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <FieldLabel>Next Step</FieldLabel>
          <input
            style={inputStyle} value={nextStep}
            onChange={(e) => setNextStep(e.target.value)}
            onBlur={() => onUpdate(lead.id, { nextStep })}
            placeholder="e.g. Call to confirm colors + deposit"
          />
        </div>

        <div style={{ marginTop: 14 }}>
          <FieldLabel>Notes</FieldLabel>
          <textarea
            style={{ ...inputStyle, minHeight: 84, resize: 'vertical', fontFamily: 'Manrope, sans-serif' }}
            value={notes} onChange={(e) => setNotes(e.target.value)}
            onBlur={() => onUpdate(lead.id, { notes })}
          />
        </div>

        <div style={{ marginTop: 18 }}>
          <FieldLabel>Move Stage</FieldLabel>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {PIPELINE_STAGES.map(s => (
              <button
                key={s.id}
                onClick={() => onMoveStage(lead.id, s.id)}
                style={{
                  padding: '8px 14px', borderRadius: 999, border: `1px solid ${lead.stage === s.id ? 'transparent' : COLORS.line}`,
                  background: lead.stage === s.id ? s.color : '#fff', color: lead.stage === s.id ? '#fff' : COLORS.ink,
                  fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
                }}
              >{s.label}</button>
            ))}
          </div>
          {lead.convertedToCustomer && (
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 600, color: COLORS.teal }}>
              <UserPlus size={13} /> Added to Customers{' '}
              {convertedOrders && convertedOrders.find(o => o.id === 'won-' + lead.id)?.pushedToSheet ? '· synced to live sheet' : '· saved locally'}
            </div>
          )}
        </div>

        {lead.stageHistory && lead.stageHistory.length > 1 && (
          <div style={{ marginTop: 18 }}>
            <FieldLabel>Stage History</FieldLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[...lead.stageHistory].reverse().map((h, i) => (
                <div key={i} style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, color: COLORS.inkSoft, display: 'flex', gap: 8 }}>
                  <span style={{ fontWeight: 700, color: COLORS.ink }}>{STAGE_BY_ID[h.stage]?.label || h.stage}</span>
                  <span>{new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 22, paddingTop: 16, borderTop: `1px solid ${COLORS.line}` }}>
          {confirmDelete ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: COLORS.roseDeep, fontWeight: 600 }}>Delete this lead for good?</span>
              <button onClick={() => onDelete(lead.id)} style={{ padding: '7px 12px', borderRadius: 8, border: 'none', background: COLORS.roseDeep, color: '#fff', fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Yes, delete</button>
              <button onClick={() => setConfirmDelete(false)} style={{ padding: '7px 12px', borderRadius: 8, border: `1px solid ${COLORS.line}`, background: '#fff', fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer', color: COLORS.ink }}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setConfirmDelete(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 8, border: `1px solid ${COLORS.line}`, background: '#fff', fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', color: COLORS.roseDeep }}>
              <Trash2 size={13} /> Delete lead
            </button>
          )}
          <button onClick={onClose} style={{ padding: '9px 18px', borderRadius: 9, border: 'none', background: COLORS.navy, color: '#fff', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Done</button>
        </div>
      </div>
    </div>
  );
}

function LeadCard({ lead, onOpen, onDragStart }) {
  const s = STAGE_BY_ID[lead.stage];
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, lead.id)}
      onClick={() => onOpen(lead.id)}
      style={{
        background: '#fff', borderRadius: 12, padding: '12px 13px', cursor: 'grab',
        border: `1px solid ${COLORS.line}`, boxShadow: '0 1px 4px rgba(42,36,64,0.05)',
        borderLeft: `3px solid ${s?.color || COLORS.line}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, minWidth: 0 }}>
          <OwnerAvatar name={lead.owner} />
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 700, color: COLORS.ink, lineHeight: 1.3 }}>{lead.name}</div>
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12.5, fontWeight: 700, color: COLORS.goldDeep, whiteSpace: 'nowrap' }}>{money(lead.estValue)}</div>
      </div>
      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, color: COLORS.inkSoft, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
        <Building2 size={11} /> {lead.clientType}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 9 }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: (LEAD_COLORS[lead.source] || COLORS.inkSoft) + '22', color: LEAD_COLORS[lead.source] || COLORS.inkSoft, fontFamily: 'Manrope, sans-serif' }}>{lead.source}</span>
        <span style={{ fontSize: 11, color: COLORS.inkSoft, fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', gap: 3 }}>
          <Clock size={11} /> {daysSince(lead.updatedAt)}d
        </span>
      </div>
      {lead.nextStep && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${COLORS.line}`, fontFamily: 'Manrope, sans-serif', fontSize: 11.5, color: COLORS.ink, display: 'flex', gap: 5, alignItems: 'flex-start' }}>
          <MessageSquare size={11} color={COLORS.inkSoft} style={{ marginTop: 1.5, flexShrink: 0 }} />
          <span style={{ lineHeight: 1.35 }}>{lead.nextStep}</span>
        </div>
      )}
      {lead.convertedToCustomer && (
        <div style={{ marginTop: 8, fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, color: COLORS.teal, display: 'flex', alignItems: 'center', gap: 4 }}>
          <UserPlus size={11} /> Added to Customers
        </div>
      )}
    </div>
  );
}

function LeadColumn({ stage, leads, onOpen, onDragStart, onDrop, dragOverStage, setDragOverStage }) {
  const total = leads.reduce((s, l) => s + (Number(l.estValue) || 0), 0);
  const isOver = dragOverStage === stage.id;
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOverStage(stage.id); }}
      onDragLeave={() => setDragOverStage(prev => prev === stage.id ? null : prev)}
      onDrop={(e) => { e.preventDefault(); onDrop(stage.id); setDragOverStage(null); }}
      style={{
        flex: '1 1 0', minWidth: 250, display: 'flex', flexDirection: 'column',
        background: isOver ? stage.color + '10' : COLORS.cream, borderRadius: 14,
        border: `1.5px dashed ${isOver ? stage.color : 'transparent'}`, transition: 'background 0.12s, border 0.12s',
        padding: 10,
      }}
    >
      <div style={{ padding: '4px 4px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: stage.color, flexShrink: 0 }} />
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 15.5, fontWeight: 700, color: COLORS.ink }}>{stage.label}</div>
          <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 700, color: COLORS.inkSoft, background: '#fff', borderRadius: 999, padding: '1px 8px', marginLeft: 'auto' }}>{leads.length}</span>
        </div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, color: COLORS.inkSoft, marginTop: 3 }}>{stage.blurb}</div>
        {total > 0 && <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 700, color: COLORS.goldDeep, marginTop: 5 }}>{money(total)} total</div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, minHeight: 60 }}>
        {leads.map(l => <LeadCard key={l.id} lead={l} onOpen={onOpen} onDragStart={onDragStart} />)}
        {leads.length === 0 && (
          <div style={{ padding: '18px 8px', textAlign: 'center', fontFamily: 'Manrope, sans-serif', fontSize: 11.5, color: COLORS.inkSoft, opacity: 0.6 }}>
            Drop a lead here
          </div>
        )}
      </div>
    </div>
  );
}

function LeadsPage({ leads, onAddLead, onOpenLead, onMoveStage, search, setSearch, ownerOptions = [], ownerFilter, setOwnerFilter }) {
  const [dragId, setDragId] = useState(null);
  const [dragOverStage, setDragOverStage] = useState(null);

  const filtered = useMemo(() => {
    let list = leads;
    if (ownerFilter && ownerFilter !== 'all') {
      list = list.filter(l => (l.owner || 'Unassigned') === ownerFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(l =>
        (l.name || '').toLowerCase().includes(q) ||
        (l.phone || '').toLowerCase().includes(q) ||
        (l.email || '').toLowerCase().includes(q) ||
        (l.clientType || '').toLowerCase().includes(q) ||
        (l.owner || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [leads, search, ownerFilter]);

  const byStage = (id) => filtered.filter(l => l.stage === id).sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));

  const handleDragStart = (e, id) => { setDragId(id); e.dataTransfer.effectAllowed = 'move'; };
  const handleDrop = (stageId) => { if (dragId) { onMoveStage(dragId, stageId); setDragId(null); } };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, gap: 14, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: COLORS.ink }}>Lead Pipeline</div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.inkSoft, marginTop: 2 }}>
            Drag a card between stages, or open it to update details and next steps.
          </div>
        </div>
        <button
          onClick={onAddLead}
          style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 10, border: 'none',
            background: COLORS.navy, color: '#fff', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 6px 16px rgba(31,17,48,0.25)', flexShrink: 0,
          }}
        ><Plus size={15} /> New Lead</button>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, background: '#fff',
        border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: '8px 12px', maxWidth: 340, marginBottom: 16,
      }}>
        <Search size={15} color={COLORS.inkSoft} />
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search leads..."
          style={{ border: 'none', outline: 'none', fontFamily: 'Manrope, sans-serif', fontSize: 13, width: '100%', background: 'transparent', color: COLORS.ink }}
        />
        {search && <X size={14} color={COLORS.inkSoft} style={{ cursor: 'pointer' }} onClick={() => setSearch('')} />}
      </div>

      {ownerOptions.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16, marginTop: -8 }}>
          <button
            onClick={() => setOwnerFilter('all')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 999,
              border: `1px solid ${(!ownerFilter || ownerFilter === 'all') ? 'transparent' : COLORS.line}`,
              background: (!ownerFilter || ownerFilter === 'all') ? COLORS.navy : '#fff',
              color: (!ownerFilter || ownerFilter === 'all') ? '#fff' : COLORS.ink,
              fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            }}
          >Everyone</button>
          {ownerOptions.map(o => (
            <button
              key={o}
              onClick={() => setOwnerFilter(o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px 5px 6px', borderRadius: 999,
                border: `1px solid ${ownerFilter === o ? 'transparent' : COLORS.line}`,
                background: ownerFilter === o ? COLORS.navy : '#fff',
                color: ownerFilter === o ? '#fff' : COLORS.ink,
                fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}
            ><OwnerAvatar name={o} size={18} />{o}</button>
          ))}
        </div>
      )}

      {leads.length === 0 ? (
        <div style={{
          background: '#fff', borderRadius: 16, border: `1px dashed ${COLORS.line}`, padding: '48px 24px',
          textAlign: 'center',
        }}>
          <Target size={30} color={COLORS.lavender} style={{ marginBottom: 10 }} />
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: COLORS.ink }}>No leads yet</div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.inkSoft, marginTop: 4, marginBottom: 16 }}>
            Add your first lead to start moving it through Identified → Qualified → Closed Won/Lost.
          </div>
          <button
            onClick={onAddLead}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, border: 'none', background: COLORS.navy, color: '#fff', fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
          ><Plus size={15} /> Add a lead</button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
          {PIPELINE_STAGES.map(stage => (
            <LeadColumn
              key={stage.id} stage={stage} leads={byStage(stage.id)}
              onOpen={onOpenLead} onDragStart={handleDragStart} onDrop={handleDrop}
              dragOverStage={dragOverStage} setDragOverStage={setDragOverStage}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Analytics Page — high-level view across leads + the live business data
// ---------------------------------------------------------------------------
function AnalyticsPage({ leadStats, stats }) {
  const stageColors = PIPELINE_STAGES.map(s => s.color);
  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: COLORS.ink }}>Analytics</div>
        <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.inkSoft, marginTop: 2 }}>
          A high-level pulse on the CRM: what's coming through the pipeline, and what the business has already booked.
        </div>
      </div>

      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 10 }}>Pipeline</div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 22 }}>
        <KpiCard icon={Target} label="Total Leads" value={leadStats.total.toLocaleString()} sub={`${leadStats.byStage.identified?.count || 0} identified · ${leadStats.byStage.qualified?.count || 0} qualified`} accent={COLORS.sky} />
        <KpiCard icon={DollarSign} label="Active Pipeline Value" value={money(leadStats.pipelineValue)} sub="Identified + Qualified, open deals" accent={COLORS.lavender} />
        <KpiCard icon={Trophy} label="Deals Closed (Won)" value={leadStats.wonCount.toLocaleString()} sub={`${money(leadStats.wonValue)} in booked value`} accent={COLORS.teal} />
        <KpiCard icon={Percent} label="Win Rate" value={leadStats.winRate + '%'} sub={`${leadStats.wonCount} won vs ${leadStats.lostCount} lost`} accent={COLORS.roseDeep} />
        <KpiCard icon={Flame} label="Avg. Deal Size" value={money(leadStats.avgDealSize)} sub="per closed-won lead" accent={COLORS.gold} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16, marginBottom: 16 }}>
        <SectionCard title="Leads by Stage" subtitle="Where the pipeline stands right now" showMenu>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={leadStats.byStageChart} margin={{ left: -10, right: 10 }}>
              <CartesianGrid vertical={false} stroke={COLORS.line} />
              <XAxis dataKey="name" tick={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, fill: COLORS.inkSoft }} axisLine={{ stroke: COLORS.line }} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, fill: COLORS.inkSoft }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip formatter={(v) => v + ' leads'} />} cursor={{ fill: COLORS.cream }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {leadStats.byStageChart.map((entry, i) => <Cell key={i} fill={stageColors[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Leads by Source" subtitle="Where new leads are coming from" showMenu>
          {leadStats.leadsBySource.length ? (
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie data={leadStats.leadsBySource} dataKey="value" nameKey="name" innerRadius={62} outerRadius={86} paddingAngle={3}>
                  {leadStats.leadsBySource.map((entry, i) => <Cell key={i} fill={LEAD_COLORS[entry.name] || COLORS.inkSoft} />)}
                </Pie>
                <Tooltip content={<CustomTooltip formatter={(v) => v + ' leads'} />} />
                <Legend iconType="circle" verticalAlign="bottom" align="center" wrapperStyle={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, paddingTop: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 230, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: COLORS.inkSoft }}>No leads yet</div>
          )}
        </SectionCard>
      </div>

      <div style={{ marginBottom: 16 }}>
        <SectionCard title="New Leads per Month" subtitle="Last 6 months of pipeline activity" showMenu>
          {leadStats.leadsByMonth.length ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={leadStats.leadsByMonth} margin={{ left: -10, right: 10 }}>
                <CartesianGrid vertical={false} stroke={COLORS.line} />
                <XAxis dataKey="month" tick={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, fill: COLORS.inkSoft }} axisLine={{ stroke: COLORS.line }} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontFamily: 'Manrope, sans-serif', fontSize: 11, fill: COLORS.inkSoft }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip formatter={(v) => v + ' new leads'} />} cursor={{ fill: COLORS.cream }} />
                <Bar dataKey="value" fill={COLORS.lavender} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Manrope, sans-serif', fontSize: 12.5, color: COLORS.inkSoft }}>No leads logged yet</div>
          )}
        </SectionCard>
      </div>

      {leadStats.byOwner.length > 0 && (
        <div style={{ marginBottom: 22 }}>
          <SectionCard title="Leads by Owner" subtitle="Who's working what across the team" showMenu>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.7fr 0.9fr 0.9fr 0.9fr 0.8fr', padding: '0 4px 10px', fontFamily: 'Manrope, sans-serif', fontSize: 11, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
              <div>Owner</div>
              <div>Leads</div>
              <div>Active</div>
              <div>Pipeline $</div>
              <div>Won $</div>
              <div>Win Rate</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {leadStats.byOwner.map(o => (
                <div key={o.owner} style={{
                  display: 'grid', gridTemplateColumns: '1.4fr 0.7fr 0.9fr 0.9fr 0.9fr 0.8fr', alignItems: 'center',
                  padding: '10px 12px', borderRadius: 10, background: COLORS.cream,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Manrope, sans-serif', fontSize: 13, fontWeight: 700, color: COLORS.ink, minWidth: 0 }}>
                    <OwnerAvatar name={o.owner} size={22} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.owner}</span>
                  </div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.ink, fontWeight: 600 }}>{o.total}</div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.ink }}>{o.active}</div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.lavenderDeep, fontWeight: 600 }}>{money(o.pipelineValue)}</div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.goldDeep, fontWeight: 700 }}>{money(o.wonValue)}</div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 13, color: COLORS.ink, fontWeight: 600 }}>{o.winRate === null ? '—' : o.winRate + '%'}</div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 11.5, fontWeight: 700, color: COLORS.inkSoft, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 10 }}>Whole Business Snapshot</div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <KpiCard icon={Users} label="Total Clients on File" value={stats.totalClients.toLocaleString()} sub={`${stats.repeatClients} repeat · ${stats.newClients} first-time`} accent={COLORS.lavenderDeep} />
        <KpiCard icon={PartyPopper} label="Total Orders (All-Time)" value={stats.totalOrders.toLocaleString()} sub="both source logs" accent={COLORS.rose} />
        <KpiCard icon={DollarSign} label="All-time Gross Revenue" value={money(stats.grossRevenue)} sub="from parsed package pricing" accent={COLORS.gold} />
        <KpiCard icon={TrendingUp} label="Avg. Order Size" value={money(stats.avgOrderSize)} sub="per order, all-time" accent={COLORS.teal} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Root App
// ---------------------------------------------------------------------------
// This dashboard has exactly one live Sheet — not a per-user preference —
// so the connection URL ships baked in as a default. "Connect sheet" still
// works normally if this ever needs to change (a redeploy, a new account).
const DEFAULT_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwzXgvGSDNuoKIn_eZPsf-d-hivXOgEei8marS0TJqfZr7wQQZq34h5ViLod5tH93Zh/exec';

export default function App() {
  const [page, setPage] = useState('home');
  const [crmFilter, setCrmFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [lastContacted, setLastContacted] = useState({});
  const [campaignStage, setCampaignStage] = useState({});
  const [customCampaigns, setCustomCampaigns] = useState([]);
  const [reEngageEmails, setReEngageEmails] = useState(REENGAGE_DEFAULT_EMAILS);
  const [campaignActivity, setCampaignActivity] = useState({}); // { [campaignId]: { [clientKey]: stage } }
  const [reviewRequests, setReviewRequests] = useState({}); // { [orderTs]: {name,eventDate,state,emailSent,textSent} }
  const [crmTypeFilter, setCrmTypeFilter] = useState('all');
  const [crmStateFilter, setCrmStateFilter] = useState('all');
  const [crmEventTypeFilter, setCrmEventTypeFilter] = useState('all');
  const [sheetUrl, setSheetUrl] = useState('');
  const [liveOrders, setLiveOrders] = useState(LIVE_SNAPSHOT);
  const [syncStatus, setSyncStatus] = useState('not-configured'); // not-configured | loading | success | error
  const [lastSynced, setLastSynced] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  // Lead pipeline state — starts empty; existing customers are never auto-added here.
  const [leads, setLeads] = useState([]);
  const [leadSearch, setLeadSearch] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [showNewLead, setShowNewLead] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);

  // Orders created automatically when a lead is moved to Closed Won — merged
  // into the same order set that feeds Customers, Home, and the live sheet.
  const [convertedOrders, setConvertedOrders] = useState([]);

  // Load the saved sheet connection + local caches on first mount. The
  // sheet connection URL has to live in this browser's storage no matter
  // what — it's the bootstrapping config that says which sheet to even
  // talk to, so there's nothing "sheet-backed" to fall back on for it.
  // Custom campaigns, Re-Engagement copy, leads, and converted orders are
  // now sheet-backed (see syncFromSheet below) — what's loaded here is
  // just an offline-safe local cache in case the sheet isn't reachable yet.
  useEffect(() => {
    let mounted = true;
    try {
      const su = localStorage.getItem('sheetSourceUrl') || DEFAULT_SHEET_URL;
      if (mounted && su) {
        setSheetUrl(su);
        syncFromSheet(su);
      }
    } catch (e) { /* not configured yet — LIVE_SNAPSHOT fallback stays active */ }
    try {
      const cc = localStorage.getItem('customCampaigns');
      if (mounted && cc) setCustomCampaigns(JSON.parse(cc));
    } catch (e) { /* none cached yet */ }
    try {
      const re = localStorage.getItem('reEngageEmails');
      if (mounted && re) setReEngageEmails(JSON.parse(re));
    } catch (e) { /* using defaults */ }
    try {
      const lp = localStorage.getItem('leadPipeline');
      if (mounted && lp) setLeads(JSON.parse(lp));
    } catch (e) { /* no leads cached yet */ }
    try {
      const co = localStorage.getItem('convertedOrders');
      if (mounted && co) setConvertedOrders(JSON.parse(co));
    } catch (e) { /* nothing converted yet */ }
    return () => { mounted = false; };
  }, []);

  // Split the sheet's combined contact log ({key: {date, stage}}) into the
  // two separate pieces of local state the UI actually reads.
  const applyContacts = (contacts) => {
    if (!contacts) return;
    const dates = {}, stages = {};
    Object.entries(contacts).forEach(([k, v]) => {
      if (v && typeof v === 'object') {
        if (v.date) dates[k] = v.date;
        if (v.stage) stages[k] = v.stage;
      } else if (v) {
        dates[k] = v; // backward-compatible: older sheet format was a flat date string
      }
    });
    setLastContacted(dates);
    setCampaignStage(stages);
  };

  // Both "Last Contacted" and "Campaign Stage" live in the same tab on the
  // Google Sheet (not just this browser), so they're the same value for you
  // and the client, and they survive moving this dashboard off Claude
  // entirely — e.g. to Netlify.
  const writeContact = async (key, name, patch) => {
    if (!sheetUrl) return; // no sheet connected yet — change is local-only until you connect one
    try {
      const res = await fetch(sheetUrl, {
        method: 'POST',
        body: JSON.stringify({ key, name, ...patch }),
      });
      const result = await res.json();
      if (result && result.contacts) applyContacts(result.contacts);
    } catch (e) {
      console.error('Could not save to the sheet:', e);
    }
  };

  const updateLastContacted = (key, dateStr, name) => {
    setLastContacted(prev => ({ ...prev, [key]: dateStr })); // optimistic UI update
    writeContact(key, name, { date: dateStr });
  };

  const updateCampaignStage = (key, stage, name) => {
    setCampaignStage(prev => ({ ...prev, [key]: stage })); // optimistic UI update
    writeContact(key, name, { stage });
  };

  // Per-(campaign, client) stage tracking for custom campaigns — a separate
  // tab on the Sheet from the Re-Engagement contact log, since a client can
  // be enrolled in more than one campaign at once.
  const updateCampaignActivity = async (campaignId, key, stage, name) => {
    setCampaignActivity(prev => ({
      ...prev,
      [campaignId]: { ...(prev[campaignId] || {}), [key]: stage },
    })); // optimistic UI update
    if (!sheetUrl) return;
    try {
      const res = await fetch(sheetUrl, {
        method: 'POST',
        body: JSON.stringify({ type: 'campaignActivity', campaignId, key, name, stage }),
      });
      const result = await res.json();
      if (result && result.campaignActivity) setCampaignActivity(result.campaignActivity);
    } catch (e) {
      console.error('Could not save campaign activity to the sheet:', e);
    }
  };

  const syncFromSheet = async (url) => {
    if (!url) return;
    setSyncStatus('loading');
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const payload = await res.json();
      const rawOrders = Array.isArray(payload) ? payload : (payload.orders || []);
      const normalized = rawOrders.map((r, i) => normalizeLiveRow(r, i));
      setLiveOrders(normalized);
      if (!Array.isArray(payload) && payload.contacts) applyContacts(payload.contacts);
      if (!Array.isArray(payload) && payload.campaignActivity) setCampaignActivity(payload.campaignActivity);
      if (!Array.isArray(payload) && payload.reviewRequests) setReviewRequests(payload.reviewRequests);
      if (!Array.isArray(payload) && payload.leads) {
        // Sheet wins for anything it already has, but any lead created while
        // disconnected (not yet pushed) is preserved, not silently dropped.
        setLeads(prevLeads => {
          const sheetIds = new Set(payload.leads.map(l => l.id));
          const localOnly = prevLeads.filter(l => !sheetIds.has(l.id));
          return [...payload.leads, ...localOnly];
        });
      }
      if (!Array.isArray(payload) && payload.campaigns) {
        // Same safe-merge pattern as leads — a campaign built while
        // disconnected isn't lost, it's just appended after the sheet's copy.
        setCustomCampaigns(prev => {
          const sheetIds = new Set(payload.campaigns.map(c => c.id));
          const localOnly = prev.filter(c => !sheetIds.has(c.id));
          return [...payload.campaigns, ...localOnly];
        });
      }
      if (!Array.isArray(payload) && payload.reEngageEmails && Object.keys(payload.reEngageEmails).length > 0) {
        // Sheet has customized copy for at least one email — apply it,
        // falling back to the built-in default for any email not yet edited.
        setReEngageEmails(prev => prev.map((e, i) => {
          const fromSheet = payload.reEngageEmails[String(i + 1)];
          return fromSheet ? { subject: fromSheet.subject, body: fromSheet.body } : e;
        }));
      }
      setSyncStatus('success');
      setLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      // Once a synced pull happens, any locally-converted order we already
      // pushed to the sheet should now be coming back through liveOrders —
      // drop the local copy so it isn't double-counted in revenue/clients.
      setConvertedOrders(prev => {
        const stillLocal = prev.filter(o => !o.pushedToSheet);
        if (stillLocal.length !== prev.length) {
          try { localStorage.setItem('convertedOrders', JSON.stringify(stillLocal)); }
          catch (e) { /* ignore */ }
        }
        return stillLocal;
      });
    } catch (e) {
      console.error('Live sync failed, showing last known snapshot:', e);
      setSyncStatus('error');
    }
  };

  // Background auto-refresh — on top of the manual Refresh button and the
  // sync that already happens on page load. Every 3 minutes, quietly pulls
  // the latest sheet data with no action needed from whoever's viewing it;
  // the Refresh button is still there for "I need this right now."
  useEffect(() => {
    if (!sheetUrl) return;
    const AUTO_REFRESH_MS = 3 * 60 * 1000; // 3 minutes
    const intervalId = setInterval(() => {
      syncFromSheet(sheetUrl);
    }, AUTO_REFRESH_MS);
    return () => clearInterval(intervalId);
  }, [sheetUrl]);

  const saveSettings = async (url) => {
    setSheetUrl(url);
    setShowSettings(false);
    try { localStorage.setItem('sheetSourceUrl', url); } catch (e) { /* ignore */ }
    if (url) syncFromSheet(url);
    else setSyncStatus('not-configured');
  };

  // Merge frozen history + live (or fallback) orders + locally-converted won
  // leads, then derive everything else from that
  const allOrders = useMemo(() => [...STATIC_ORDERS, ...liveOrders, ...convertedOrders], [liveOrders, convertedOrders]);
  const clients = useMemo(() => computeClients(allOrders), [allOrders]);
  const mergedData = useMemo(() => ({ orders: allOrders, clients }), [allOrders, clients]);

  const stats = useMemo(() => computeStats(mergedData), [mergedData]);
  const upcoming = useMemo(() => computeUpcoming(mergedData), [mergedData]);
  const upcomingKeys = useMemo(() => upcoming.map(u => u.k), [upcoming]);
  const anniversaries = useMemo(() => computeAnniversaries(mergedData.clients), [mergedData]);

  const goToCrmFilter = (filterId) => {
    setPage('crm');
    setCrmFilter(filterId);
    setSearch('');
  };
  const goToUpcoming = () => goToCrmFilter('upcoming');

  // Jump to the CRM with the exact Type/State/Event Type filters a campaign
  // was built with, so "View Matching Clients" shows precisely that audience.
  const goToCrmWithFilters = (filters) => {
    setPage('crm');
    setCrmFilter('all');
    setSearch('');
    setCrmTypeFilter(filters.type || 'all');
    setCrmStateFilter(filters.state || 'all');
    setCrmEventTypeFilter(filters.eventType || 'all');
  };

  const saveCustomCampaigns = (next) => {
    setCustomCampaigns(next);
    try { localStorage.setItem('customCampaigns', JSON.stringify(next)); } catch (e) { /* ignore */ }
  };

  // Pushes one campaign's current definition to the Sheet's "Campaigns" tab —
  // same optimistic-then-confirm pattern as leads and contacts.
  const postCampaignDef = async (campaign) => {
    if (!sheetUrl) return;
    try {
      const res = await fetch(sheetUrl, {
        method: 'POST',
        body: JSON.stringify({ type: 'campaignDef', campaign }),
      });
      const result = await res.json();
      if (result && result.campaigns) saveCustomCampaigns(result.campaigns);
    } catch (e) {
      console.error('Could not save campaign to the sheet:', e);
    }
  };
  const postDeleteCampaignDef = async (id) => {
    if (!sheetUrl) return;
    try {
      const res = await fetch(sheetUrl, {
        method: 'POST',
        body: JSON.stringify({ type: 'campaignDef', deleted: true, campaign: { id } }),
      });
      const result = await res.json();
      if (result && result.campaigns) saveCustomCampaigns(result.campaigns);
    } catch (e) {
      console.error('Could not delete campaign from the sheet:', e);
    }
  };

  const handleCreateCampaign = (campaign) => {
    saveCustomCampaigns([campaign, ...customCampaigns]);
    postCampaignDef(campaign);
  };
  const handleRemoveCampaign = (id) => {
    saveCustomCampaigns(customCampaigns.filter(c => c.id !== id));
    postDeleteCampaignDef(id);
  };
  const handleUpdateCampaignEmail = (campaignId, index, field, value) => {
    const updated = customCampaigns.find(c => c.id === campaignId);
    if (!updated) return;
    const emails = updated.emails.map((e, i) => i === index ? { ...e, [field]: value } : e);
    const next = { ...updated, emails };
    saveCustomCampaigns(customCampaigns.map(c => c.id === campaignId ? next : c));
    postCampaignDef(next);
  };
  const handleUpdateCampaign = (campaignId, patch) => {
    const updated = customCampaigns.find(c => c.id === campaignId);
    if (!updated) return;
    const next = { ...updated, ...patch };
    saveCustomCampaigns(customCampaigns.map(c => c.id === campaignId ? next : c));
    postCampaignDef(next);
  };

  const handleUpdateReEngageEmail = (index, field, value) => {
    setReEngageEmails(prev => {
      const next = prev.map((e, i) => i === index ? { ...e, [field]: value } : e);
      try { localStorage.setItem('reEngageEmails', JSON.stringify(next)); } catch (e) { /* ignore */ }
      if (sheetUrl) {
        const updatedEmail = next[index];
        (async () => {
          try {
            const res = await fetch(sheetUrl, {
              method: 'POST',
              body: JSON.stringify({ type: 'reEngageEmail', emailNum: index + 1, subject: updatedEmail.subject, body: updatedEmail.body }),
            });
            const result = await res.json();
            if (result && result.reEngageEmails && Object.keys(result.reEngageEmails).length > 0) {
              setReEngageEmails(prevInner => prevInner.map((e, i) => {
                const fromSheet = result.reEngageEmails[String(i + 1)];
                return fromSheet ? { subject: fromSheet.subject, body: fromSheet.body } : e;
              }));
            }
          } catch (err) {
            console.error('Could not save Re-Engagement copy to the sheet:', err);
          }
        })();
      }
      return next;
    });
  };

  // -------------------------------------------------------------------------
  // Lead Pipeline
  // -------------------------------------------------------------------------
  const persistLeads = (next) => {
    setLeads(next);
    try { localStorage.setItem('leadPipeline', JSON.stringify(next)); }
    catch (e) { console.error('Could not cache lead pipeline locally', e); }
  };

  // Pushes one lead's current state to the Sheet's "Leads" tab, and
  // reconciles local state with whatever comes back — same optimistic-then-
  // confirm pattern as contacts and campaign activity.
  const postLead = async (lead) => {
    if (!sheetUrl) return;
    try {
      const res = await fetch(sheetUrl, {
        method: 'POST',
        body: JSON.stringify({ type: 'lead', lead }),
      });
      const result = await res.json();
      if (result && result.leads) setLeads(result.leads);
    } catch (e) {
      console.error('Could not save lead to the sheet:', e);
    }
  };

  const postDeleteLead = async (leadId) => {
    if (!sheetUrl) return;
    try {
      const res = await fetch(sheetUrl, {
        method: 'POST',
        body: JSON.stringify({ type: 'lead', deleted: true, lead: { id: leadId } }),
      });
      const result = await res.json();
      if (result && result.leads) setLeads(result.leads);
    } catch (e) {
      console.error('Could not delete lead from the sheet:', e);
    }
  };

  const addLead = (form) => {
    const lead = makeLead(form);
    persistLeads([lead, ...leads]);
    postLead(lead);
    setShowNewLead(false);
  };

  const updateLead = (id, patch) => {
    const updated = { ...leads.find(l => l.id === id), ...patch, updatedAt: nowISO() };
    persistLeads(leads.map(l => l.id === id ? updated : l));
    postLead(updated);
  };

  const persistConvertedOrders = (next) => {
    setConvertedOrders(next);
    try { localStorage.setItem('convertedOrders', JSON.stringify(next)); }
    catch (e) { console.error('Could not cache converted orders locally', e); }
  };

  const markOrderPushed = (orderId) => {
    setConvertedOrders(prev => {
      const next = prev.map(o => o.id === orderId ? { ...o, pushedToSheet: true } : o);
      try { localStorage.setItem('convertedOrders', JSON.stringify(next)); }
      catch (e) { /* ignore */ }
      return next;
    });
  };

  const moveLeadStage = (id, stageId) => {
    const lead = leads.find(l => l.id === id);
    if (!lead || lead.stage === stageId) return;
    const ts = nowISO();
    const updatedLead = { ...lead, stage: stageId, updatedAt: ts, stageHistory: [...(lead.stageHistory || []), { stage: stageId, date: ts }] };

    // First time a lead lands in Closed Won, mint a customer order for it —
    // this is what makes it show up under Customers / Home immediately.
    if (stageId === 'closed_won' && !lead.convertedToCustomer) {
      const order = leadToOrder(lead);
      updatedLead.convertedToCustomer = true;
      updatedLead.orderKey = order.k;
      persistConvertedOrders([...convertedOrders, order]);

      // Best-effort push to the same live sheet Home syncs from, so it's not
      // just a local record — requires the addOrder branch in the Apps Script.
      if (sheetUrl) {
        (async () => {
          try {
            const res = await fetch(sheetUrl, {
              method: 'POST',
              body: JSON.stringify({ action: 'addOrder', row: leadToSheetRow(lead) }),
            });
            if (res.ok) {
              markOrderPushed(order.id);
              syncFromSheet(sheetUrl); // pull fresh so the sheet becomes the source of truth
            }
          } catch (e) {
            console.error('Could not push won lead to live sheet — it still shows locally.', e);
          }
        })();
      }
    }

    persistLeads(leads.map(l => l.id === id ? updatedLead : l));
    postLead(updatedLead);
  };

  const deleteLead = (id) => {
    persistLeads(leads.filter(l => l.id !== id));
    postDeleteLead(id);
    setSelectedLeadId(null);
  };

  const leadStats = useMemo(() => computeLeadStats(leads), [leads]);
  const selectedLead = useMemo(() => leads.find(l => l.id === selectedLeadId) || null, [leads, selectedLeadId]);
  const ownerOptions = useMemo(
    () => Array.from(new Set(leads.map(l => (l.owner || '').trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b)),
    [leads]
  );

  return (
    <div style={{
      display: 'flex', minHeight: '100vh', width: '100%',
      background: COLORS.cream, fontFamily: 'Manrope, sans-serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,600&family=Playball&family=Manrope:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.6; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: #D9CDBB; border-radius: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      <Sidebar
        page={page} setPage={setPage}
        orderCount={allOrders.length}
        syncStatus={syncStatus} lastSynced={lastSynced}
        onOpenSettings={() => setShowSettings(true)}
        onRefresh={() => sheetUrl ? syncFromSheet(sheetUrl) : setShowSettings(true)}
      />

      <main style={{ flex: 1, padding: '28px 32px 60px', maxWidth: 1180, margin: '0 auto', width: '100%' }}>
        {page === 'home' && <HomePage stats={stats} upcoming={upcoming} goToUpcoming={goToUpcoming} goToCrmFilter={goToCrmFilter} leadStats={leadStats} />}
        {page === 'crm' && (
          <CrmPage
            clients={mergedData.clients}
            orders={mergedData.orders}
            filter={crmFilter}
            setFilter={setCrmFilter}
            search={search}
            setSearch={setSearch}
            lastContacted={lastContacted}
            updateLastContacted={updateLastContacted}
            expanded={expanded}
            setExpanded={setExpanded}
            upcomingKeys={upcomingKeys}
            typeFilter={crmTypeFilter}
            setTypeFilter={setCrmTypeFilter}
            stateFilter={crmStateFilter}
            setStateFilter={setCrmStateFilter}
            eventTypeFilter={crmEventTypeFilter}
            setEventTypeFilter={setCrmEventTypeFilter}
          />
        )}
        {page === 'pipeline' && (
          <LeadsPage
            leads={leads}
            onAddLead={() => setShowNewLead(true)}
            onOpenLead={setSelectedLeadId}
            onMoveStage={moveLeadStage}
            search={leadSearch}
            setSearch={setLeadSearch}
            ownerOptions={ownerOptions}
            ownerFilter={ownerFilter}
            setOwnerFilter={setOwnerFilter}
          />
        )}
        {page === 'analytics' && <AnalyticsPage leadStats={leadStats} stats={stats} />}
        {page === 'email-marketing' && (
          <EmailMarketingPage
            anniversaries={anniversaries}
            campaignStage={campaignStage}
            updateCampaignStage={updateCampaignStage}
            clients={mergedData.clients}
            customCampaigns={customCampaigns}
            campaignActivity={campaignActivity}
            onCreateCampaign={handleCreateCampaign}
            onRemoveCampaign={handleRemoveCampaign}
            onViewCampaign={goToCrmWithFilters}
            onUpdateCampaignActivity={updateCampaignActivity}
            reEngageEmails={reEngageEmails}
            onUpdateReEngageEmail={handleUpdateReEngageEmail}
            onUpdateCampaignEmail={handleUpdateCampaignEmail}
            onUpdateCampaign={handleUpdateCampaign}
          />
        )}
        {page === 'social-media' && <SocialMediaPage />}
        {page === 'reputation-builder' && <ReputationBuilderPage reviewRequests={reviewRequests} syncStatus={syncStatus} />}
      </main>

      {showSettings && (
        <SettingsModal
          initialUrl={sheetUrl}
          onSave={saveSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showNewLead && (
        <NewLeadModal onSave={addLead} onClose={() => setShowNewLead(false)} ownerOptions={ownerOptions} />
      )}

      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLeadId(null)}
          onUpdate={updateLead}
          onDelete={deleteLead}
          onMoveStage={moveLeadStage}
          ownerOptions={ownerOptions}
          convertedOrders={convertedOrders}
        />
      )}
    </div>
  );
