export const gunSellerList = [
    {_id: 1, gunNick: 'Leon Kennedy', experience: 'Military Specialist', salary: 50000},
    {_id: 2, gunNick: 'IDarius', experience: 'Advanced', salary: 20000}
]

export const gunSellerDetailsList = [
    {
        "_id": 1,
        "gunNick": "Leon Kennedy",
        "experience": "Military Specialist",
        "salary": "50000",
        "appointments": [
            {
                "_id": 1,
                "cus_id": 1,
                "gun_id": 1,
                "date": "2022-12-23",
                "location": "Warszawa Centralna",
                "customer": {
                    "_id": 1,
                    "firstName": "Artem",
                    "lastName": "Sydorovych",
                    "nickName": "presidentMira",
                    "phoneNumber": "797 979 779"
                }
            },
            {
                "_id": 2,
                "cus_id": 2,
                "gun_id": 1,
                "date": "2022-01-13",
                "location": "Warszawa Wschodnia",
                "customer": {
                    "_id": 2,
                    "firstName": "Oleksandr",
                    "lastName": "Podolich",
                    "nickName": "Marquizy",
                    "phoneNumber": "888 111 222"
                }
            }
        ]
    },
    {
        "_id": 2,
        "gunNick": "IDarius",
        "experience": "Advanced",
        "salary": "20000",
        "appointments": [
        {
            "_id": 3,
            "cus_id": 2,
            "gun_id": 2,
            "date": "2022-11-30",
            "location": "Marszalkowska 32",
            "customer": {
                "_id": 2,
                "firstName": "Oleksandr",
                "lastName": "Podolich",
                "nickName": "Marquizy",
                "phoneNumber": "888 111 222"
            }
        }
        ]
    }
]