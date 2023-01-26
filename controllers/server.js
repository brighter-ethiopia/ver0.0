const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const path = require('path')
const Users = require('../models/users')
const Ads = require('../models/ads')

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');

    return response;
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password) => {
    return password.match(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
    );
};

const distribution = async (req, res) => {
    const request = JSON.parse(req.body.request)
    if (request.requestType == 'logout') {
        const previousUrl = request.currentUrl
        res.clearCookie('userRegistered')
        return res.json({ status: 'success', previousUrl: previousUrl })
    } else if (request.requestType == 'publishAd') {
        const publishArray = request.publishArray
        const imgSrcArray = JSON.parse(request.publishArray.picture)

        const imgFolderDir = fs.readdirSync(`${path.join(__dirname, '..', 'uploads', 'img')}`)
        if (imgFolderDir.length == 0) {
            function generateRandom(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min)
            }

            const random = generateRandom(2000000, 10000000)
            for (var i = 0; i < imgSrcArray.length; i++) {
                var imageBuffer = decodeBase64Image(imgSrcArray[i]);
                const dir = `${path.join(__dirname, '..', 'uploads', 'img')}/${random}`
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                    fs.writeFile(`${path.join(__dirname, '..', 'uploads', 'img')}/${random}/${i}.jpg`, imageBuffer.data, function (err) { });
                    if (i === imgSrcArray.length - 1) {
                        const dateTime = new Date();
                        const dbReadyPublishArray = { "category": publishArray.category.replaceAll('\\', '').replaceAll('"', "'"), "title": publishArray.title, "pictureFolder": random, "phoneNumber": publishArray.phoneNumber, "price": publishArray.price, "negotiable": publishArray.negotiable, "shippable": publishArray.shippable, "description": publishArray.description, "age": publishArray.age, "usage": publishArray.usage, "condition": publishArray.condition, "location": publishArray.location, "publishDateTime": dateTime, "longitude": publishArray.longitude, "latitude": publishArray.latitude, "user_id": publishArray.user_id }

                        const newAdData = new Ads({
                            ads: JSON.stringify(dbReadyPublishArray),
                        })

                        newAdData.save()
                            .then(async () => {
                                return res.json({ status: 'success' })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                } else {
                    fs.writeFile(`${path.join(__dirname, '..', 'uploads', 'img')}/${random}/${i}.jpg`, imageBuffer.data, function (err) { });
                    if (i === imgSrcArray.length - 1) {
                        const dateTime = new Date();
                        const dbReadyPublishArray = { "category": publishArray.category.replaceAll('\\', '').replaceAll('"', "'"), "title": publishArray.title, "pictureFolder": random, "phoneNumber": publishArray.phoneNumber, "price": publishArray.price, "negotiable": publishArray.negotiable, "shippable": publishArray.shippable, "description": publishArray.description, "age": publishArray.age, "usage": publishArray.usage, "condition": publishArray.condition, "location": publishArray.location, "publishDateTime": dateTime, "longitude": publishArray.longitude, "latitude": publishArray.latitude, "user_id": publishArray.user_id }

                        const newAdData = new Ads({
                            ads: JSON.stringify(dbReadyPublishArray),
                        })

                        newAdData.save()
                            .then(async () => {
                                return res.json({ status: 'success' })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                }
            }
        } else {
            function generateRandom(min, max) {
                var num = Math.floor(Math.random() * (max - min + 1)) + min;
                return imgFolderDir.includes(num) ? generateRandom(min, max) : num;
            }

            const random = generateRandom(2000000, 10000000)
            for (var i = 0; i < imgSrcArray.length; i++) {
                var imageBuffer = decodeBase64Image(imgSrcArray[i]);
                const dir = `${path.join(__dirname, '..', 'uploads', 'img')}/${random}`
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                    fs.writeFile(`${path.join(__dirname, '..', 'uploads', 'img')}/${random}/${i}.jpg`, imageBuffer.data, function (err) { });
                    if (i === imgSrcArray.length - 1) {
                        const dateTime = new Date();
                        const dbReadyPublishArray = { "category": publishArray.category.replaceAll('\\', '').replaceAll('"', "'"), "title": publishArray.title, "pictureFolder": random, "phoneNumber": publishArray.phoneNumber, "price": publishArray.price, "negotiable": publishArray.negotiable, "shippable": publishArray.shippable, "description": publishArray.description, "age": publishArray.age, "usage": publishArray.usage, "condition": publishArray.condition, "location": publishArray.location, "publishDateTime": dateTime, "longitude": publishArray.longitude, "latitude": publishArray.latitude, "user_id": publishArray.user_id }

                        const newAdData = new Ads({
                            ads: JSON.stringify(dbReadyPublishArray),
                        })

                        newAdData.save()
                            .then(async () => {
                                return res.json({ status: 'success' })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                } else {
                    fs.writeFile(`${path.join(__dirname, '..', 'uploads', 'img')}/${random}/${i}.jpg`, imageBuffer.data, function (err) { });
                    if (i === imgSrcArray.length - 1) {
                        const dateTime = new Date();
                        const dbReadyPublishArray = { "category": publishArray.category.replaceAll('\\', '').replaceAll('"', "'"), "title": publishArray.title, "pictureFolder": random, "phoneNumber": publishArray.phoneNumber, "price": publishArray.price, "negotiable": publishArray.negotiable, "shippable": publishArray.shippable, "description": publishArray.description, "age": publishArray.age, "usage": publishArray.usage, "condition": publishArray.condition, "location": publishArray.location, "publishDateTime": dateTime, "longitude": publishArray.longitude, "latitude": publishArray.latitude, "user_id": publishArray.user_id }

                        const newAdData = new Ads({
                            ads: JSON.stringify(dbReadyPublishArray),
                        })

                        newAdData.save()
                            .then(async () => {
                                return res.json({ status: 'success' })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                }
            }
        }
    } else if (request.requestType == 'editAd') {
        const editedAdArray = request.editedAdArray
        const imgSrcArray = JSON.parse(editedAdArray.picture)
        const deleteAdIdentifierPictureFolder = request.pictureFolder
        const adId = request.adId

        const imgFolderDir = fs.readdirSync(`${path.join(__dirname, '..', 'uploads', 'img')}`)
        if (imgFolderDir.length == 0) {
            function generateRandom(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min)
            }

            const random = generateRandom(2000000, 10000000)
            for (var i = 0; i < imgSrcArray.length; i++) {
                var imageBuffer = decodeBase64Image(imgSrcArray[i]);
                const dir = `${path.join(__dirname, '..', 'uploads', 'img')}/${random}`
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                    fs.writeFile(`${path.join(__dirname, '..', 'uploads', 'img')}/${random}/${i}.jpg`, imageBuffer.data, function (err) { });
                    if (i === imgSrcArray.length - 1) {
                        const dateTime = new Date();
                        const dbReadyPublishArray = { "category": editedAdArray.category.replace(/\\/g, '').replace(/"/g, "'"), "title": editedAdArray.title, "pictureFolder": random, "phoneNumber": editedAdArray.phoneNumber, "price": editedAdArray.price, "negotiable": editedAdArray.negotiable, "shippable": editedAdArray.shippable, "description": editedAdArray.description, "age": editedAdArray.age, "usage": editedAdArray.usage, "condition": editedAdArray.condition, "location": editedAdArray.location, "publishDateTime": dateTime, "longitude": editedAdArray.longitude, "latitude": editedAdArray.latitude, "user_id": editedAdArray.user_id }

                        Ads.findById(adId)
                            .then((result) => {
                                Object.assign(result, {
                                    "ads": JSON.stringify(dbReadyPublishArray)
                                })
                                result.save()
                                    .then((result) => {
                                        fs.rmSync(`${path.join(__dirname, '..', 'uploads', 'img')}/${deleteAdIdentifierPictureFolder}`, { recursive: true, force: true });
                                        return res.json({ status: 'success' })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                } else {
                    fs.writeFile(`${path.join(__dirname, '..', 'uploads', 'img')}/${random}/${i}.jpg`, imageBuffer.data, function (err) { });
                    if (i === imgSrcArray.length - 1) {
                        const dateTime = new Date();
                        const dbReadyPublishArray = { "category": editedAdArray.category.replace(/\\/g, '').replace(/"/g, "'"), "title": editedAdArray.title, "pictureFolder": random, "phoneNumber": editedAdArray.phoneNumber, "price": editedAdArray.price, "negotiable": editedAdArray.negotiable, "shippable": editedAdArray.shippable, "description": editedAdArray.description, "age": editedAdArray.age, "usage": editedAdArray.usage, "condition": editedAdArray.condition, "location": editedAdArray.location, "publishDateTime": dateTime, "longitude": editedAdArray.longitude, "latitude": editedAdArray.latitude, "user_id": editedAdArray.user_id }

                        Ads.findById(adId)
                            .then((result) => {
                                Object.assign(result, {
                                    "ads": JSON.stringify(dbReadyPublishArray)
                                })
                                result.save()
                                    .then((result) => {
                                        fs.rmSync(`${path.join(__dirname, '..', 'uploads', 'img')}/${deleteAdIdentifierPictureFolder}`, { recursive: true, force: true });
                                        return res.json({ status: 'success' })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                }
            }
        } else {
            function generateRandom(min, max) {
                var num = Math.floor(Math.random() * (max - min + 1)) + min;
                return imgFolderDir.includes(num) ? generateRandom(min, max) : num;
            }

            const random = generateRandom(2000000, 10000000)
            for (var i = 0; i < imgSrcArray.length; i++) {
                var imageBuffer = decodeBase64Image(imgSrcArray[i]);
                const dir = `${path.join(__dirname, '..', 'uploads', 'img')}/${random}`
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                    fs.writeFile(`${path.join(__dirname, '..', 'uploads', 'img')}/${random}/${i}.jpg`, imageBuffer.data, function (err) { });
                    if (i === imgSrcArray.length - 1) {
                        const dateTime = new Date();
                        const dbReadyPublishArray = { "category": editedAdArray.category.replace(/\\/g, '').replace(/"/g, "'"), "title": editedAdArray.title, "pictureFolder": random, "phoneNumber": editedAdArray.phoneNumber, "price": editedAdArray.price, "negotiable": editedAdArray.negotiable, "shippable": editedAdArray.shippable, "description": editedAdArray.description, "age": editedAdArray.age, "usage": editedAdArray.usage, "condition": editedAdArray.condition, "location": editedAdArray.location, "publishDateTime": dateTime, "longitude": editedAdArray.longitude, "latitude": editedAdArray.latitude, "user_id": editedAdArray.user_id }

                        Ads.findById(adId)
                            .then((result) => {
                                Object.assign(result, {
                                    "ads": JSON.stringify(dbReadyPublishArray)
                                })
                                result.save()
                                    .then((result) => {
                                        fs.rmSync(`${path.join(__dirname, '..', 'uploads', 'img')}/${deleteAdIdentifierPictureFolder}`, { recursive: true, force: true });
                                        return res.json({ status: 'success' })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                } else {
                    fs.writeFile(`${path.join(__dirname, '..', 'uploads', 'img')}/${random}/${i}.jpg`, imageBuffer.data, function (err) { });
                    if (i === imgSrcArray.length - 1) {
                        const dateTime = new Date();
                        const dbReadyPublishArray = { "category": editedAdArray.category.replace(/\\/g, '').replace(/"/g, "'"), "title": editedAdArray.title, "pictureFolder": random, "phoneNumber": editedAdArray.phoneNumber, "price": editedAdArray.price, "negotiable": editedAdArray.negotiable, "shippable": editedAdArray.shippable, "description": editedAdArray.description, "age": editedAdArray.age, "usage": editedAdArray.usage, "condition": editedAdArray.condition, "location": editedAdArray.location, "publishDateTime": dateTime, "longitude": editedAdArray.longitude, "latitude": editedAdArray.latitude, "user_id": editedAdArray.user_id }

                        Ads.findById(adId)
                            .then((result) => {
                                Object.assign(result, {
                                    "ads": JSON.stringify(dbReadyPublishArray)
                                })
                                result.save()
                                    .then((result) => {
                                        fs.rmSync(`${path.join(__dirname, '..', 'uploads', 'img')}/${deleteAdIdentifierPictureFolder}`, { recursive: true, force: true });
                                        return res.json({ status: 'success' })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                }
            }
        }
    } else if (request.requestType == 'updateProfile') {
        const user = request.user
        const updateName = request.updateName
        const updateEmail = request.updateEmail
        const updatePhoneNumber = request.updatePhoneNumber

        Users.find()
            .then(async (result) => {
                if (!validateEmail(updateEmail)) return res.json({ status: 'error', error: 'email not valid' })
                if (updateEmail != user.email) {
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].email == updateEmail) {
                            return res.json({ status: 'error', error: 'There is already an account registered with this email' })
                        }
                    }
                }
                if (updatePhoneNumber.length != 10) return res.json({ status: 'error', error: 'Invalid phone number!' })
                Users.findById(user._id)
                    .then((result2) => {
                        Object.assign(result2, {
                            "name": updateName,
                            "email": updateEmail,
                            "phoneNumber": updatePhoneNumber
                        })
                        result2.save()
                            .then((result2) => {
                                return res.json({ status: 'success', success: 'Profile has been updated' })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    } else if (request.requestType == 'updatePassword') {
        const user = request.user
        const oldPassword = request.oldPassword
        const newPassword = request.newPassword
        const confirmNewPassword = request.confirmNewPassword

        Users.findById(user._id)
            .then(async (result) => {
                if (!await bcrypt.compare(oldPassword, result.password)) {
                    return res.json({ status: 'error', error: 'Incorrect old password' })
                }
                if (newPassword != confirmNewPassword) return res.json({
                    status: 'error',
                    error: `New passwords don't match`
                })
                if (oldPassword === newPassword) return res.json({
                    status: 'error',
                    error: `New password can't be the same as your old password`
                })
                if (!validatePassword(newPassword)) {
                    if (newPassword.match("(?=.*?[#?!@$%^&*-])")) {
                        return res.json({ status: 'error', error: 'Password not valid <br /> Special characters not allowed!' })
                    } else if (!newPassword.match(".{8,}")) {
                        return res.json({ status: 'error', error: 'Password not valid <br /> Must be atleast 8 characters long!' })
                    } else if (!newPassword.match("(?=.*?[0-9])")) {
                        return res.json({ status: 'error', error: 'Password not valid <br /> At-least 1 number required!' })
                    } else if (!newPassword.match("(?=.*?[A-Z])")) {
                        return res.json({ status: 'error', error: 'Password not valid <br /> At-least 1 uppercase letter required!' })
                    } else if (!newPassword.match("(?=.*?[a-z])")) {
                        return res.json({ status: 'error', error: 'Password not valid <br /> At-least 1 lowercase letter required!' })
                    }
                }
                const hashedPassword = await bcrypt.hash(newPassword, 10)
                Users.findById(result.id)
                    .then((result2) => {
                        Object.assign(result2, {
                            "password": hashedPassword
                        })
                        result2.save()
                            .then((result2) => {
                                const token = jwt.sign({ id: result2.id }, process.env.JWT_SECRET, {
                                    expiresIn: process.env.JWT_EXPIRES
                                })
                                const cookieOption = {
                                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                                    httpOnly: true
                                }
                                res.cookie('userRegistered', token, cookieOption)
                                console.log('user ' + result2.email + ' updated their password')
                                return res.json({ status: 'success', success: 'Updating password ...' })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    } else if (request.requestType == 'deleteAd') {
        const verifyPictureFolder = parseInt(request.verifyPictureFolder)
        const adId = request.adId

        Ads.findOneAndRemove({ _id: adId },
            function (err) {
                if (err) {
                    console.log(err)
                }
                else {
                    const dir = `${path.join(__dirname, '..', 'uploads', 'img')}\\${verifyPictureFolder}`
                    fs.rmSync(dir, { recursive: true, force: true });

                    return res.json({ status: 'success', success: 'Ad removed' })
                }
            });
    } else if (request.requestType == 'userAdImages') {
        const pictureFolder = request.pictureFolder.toString()
        fs.readdir(path.join(__dirname, '..', 'uploads', 'img', pictureFolder), (err, files) => {
            if (err) {
                console.log(err)
                return res.json({ status: 'error', error: 'something went wrong!' })
            }
            let pictureFolderImages = []
            files.forEach(file => {
                pictureFolderImages.push(file)
            });
            return res.json({ status: 'success', pictureFolderImages: pictureFolderImages })
        });
    } else if (request.requestType == 'search') {
        const searchTerm = request.searchTerm

        Ads.find()
            .then(async (result) => {
                let searchResults = []
                for (var i = 0; i < result.length; i++) {
                    const adTitles = JSON.parse(result[i].ads).title
                    if (adTitles.toLowerCase().includes(searchTerm.toLowerCase())) {
                        searchResults.push(result[i])
                    }
                }
                return res.json({ status: 'success', searchResults: searchResults.reverse() })
            })
            .catch((err) => {
                console.log(err)
            })
    } else if (request.requestType == 'adImgFiles') {
        const folderNumber = request.folderNumber

        try {
            let files = []
            fs.readdirSync(path.join(__dirname, '..', 'uploads', 'img', folderNumber.toString())).forEach(file => {
                files.push(file)
            });
            return res.json({ status: 'success', files: files })
        } catch (err) {
            return res.json({ status: 'error' })
        }

    } else if (request.requestType == 'userAds') {
        const user_id = request.user_id

        Ads.find()
            .then((result) => {
                let userAds = []

                for (var i = 0; i < result.length; i++) {
                    const adsUserId = JSON.parse(result[i].ads).user_id
                    if (adsUserId == user_id) {
                        userAds.push(result[i])
                    }
                }

                return res.json({ status: 'success', userAds: userAds })
            })
            .catch((err) => {
                console.log(err)
            })
    } else if (request.requestType == 'specificAdData') {
        const adId = request.adId

        Ads.findById(adId)
            .then((result) => {
                const ads = JSON.parse(result.ads)
                if (request.needed == 'longitudeAndLatitude') {
                    const longitudeAndLatitude = `{"longitude": "${ads.longitude}", "latitude": "${ads.latitude}"}`
                    return res.json({ status: 'success', neededData: longitudeAndLatitude })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    } else if (request.requestType == 'favortieAds') {
        const user = request.user
        const adId = request.adId

        if (request.method == 'add') {
            Users.findById(user._id)
                .then((result) => {
                    if (result.favoriteAds === undefined) {
                        Users.findById(user._id)
                            .then((result2) => {
                                Object.assign(result2, {
                                    "favoriteAds": '[]'
                                })
                                result2.save()
                                    .then((result2) => {
                                        const previousFavoriteAds = JSON.parse(result2.favoriteAds.replace(/'/g, '"'))
                                        if (previousFavoriteAds.includes(adId) == false) {
                                            previousFavoriteAds.push(adId)
                                            const updatedFavoriteAds = JSON.stringify(previousFavoriteAds).replace(/"/g, "'")

                                            Users.findById(user._id)
                                                .then((result3) => {
                                                    Object.assign(result3, {
                                                        "favoriteAds": updatedFavoriteAds
                                                    })
                                                    result3.save()
                                                        .then(() => {
                                                            console.log('pass')
                                                            return res.json({ status: 'success', removeStatus: 'favoriteAdRemoved' })
                                                        })
                                                        .catch((err) => {
                                                            console.log(err)
                                                        })
                                                })
                                                .catch((err) => {
                                                    console.log(err)
                                                })
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    } else {
                        Users.findById(user._id)
                            .then((result) => {
                                const previousFavoriteAds = JSON.parse(result.favoriteAds.replace(/'/g, '"'))
                                if (previousFavoriteAds.includes(adId) == false) {
                                    previousFavoriteAds.push(adId)
                                    const updatedFavoriteAds = JSON.stringify(previousFavoriteAds).replace(/"/g, "'")

                                    Users.findById(user._id)
                                        .then((result2) => {
                                            Object.assign(result2, {
                                                "favoriteAds": updatedFavoriteAds
                                            })
                                            result2.save()
                                                .then(() => {
                                                    return res.json({ status: 'success', addStatus: 'addedToFavorites' })
                                                })
                                                .catch((err) => {
                                                    console.log(err)
                                                })
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                }

                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else if (request.method == 'remove') {
            Users.findById(user._id)
                .then((result) => {
                    if (result.favoriteAds === undefined) {
                        Users.findById(user._id)
                            .then((result2) => {
                                Object.assign(result2, {
                                    "favoriteAds": '[]'
                                })
                                result2.save()
                                    .then(() => {
                                        return res.json({ status: 'success', removeStatus: 'noAds' })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    } else {
                        Users.findById(user._id)
                            .then((result) => {
                                const previousFavoriteAds = JSON.parse(result.favoriteAds.replace(/'/g, '"'))

                                let newFavoriteAds = []
                                if (previousFavoriteAds.includes(adId)) {
                                    for (var i = 0; i < previousFavoriteAds.length; i++) {
                                        if (previousFavoriteAds[i] != adId) {
                                            newFavoriteAds.push(previousFavoriteAds[i])
                                        }
                                    }

                                    Users.findById(user._id)
                                        .then((result2) => {
                                            Object.assign(result2, {
                                                "favoriteAds": JSON.stringify(newFavoriteAds).replace(/"/g, "'")
                                            })
                                            result2.save()
                                                .then(() => {
                                                    return res.json({ status: 'success', removeStatus: 'favoriteAdRemoved' })
                                                })
                                                .catch((err) => {
                                                    console.log(err)
                                                })
                                        })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                }

                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else if (request.method == 'get') {
            Users.findById(user._id)
                .then((result) => {
                    if (result.favoriteAds === undefined) {
                        Users.findById(user._id)
                            .then((result2) => {
                                Object.assign(result2, {
                                    "favoriteAds": '[]'
                                })
                                result2.save()
                                    .then(() => {
                                        return res.json({ status: 'success', favoriteAds: [] })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    } else {
                        Users.findById(user._id)
                            .then((result) => {
                                const previousFavoriteAds = JSON.parse(result.favoriteAds.replace(/'/g, '"'))
                                return res.json({ status: 'success', favoriteAds: previousFavoriteAds })
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }


    } else if (request.requestType == 'isFavorite') {
        const user = request.user
        const adId = request.adId

        Users.findById(user._id)
            .then((result) => {
                if (result.favoriteAds === undefined) {
                    Users.findById(user._id)
                        .then((result2) => {
                            Object.assign(result2, {
                                "favoriteAds": '[]'
                            })
                            result2.save()
                                .then((result2) => {
                                    return res.json({ status: 'success', isFavorite: false })
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                } else {
                    Users.findById(user._id)
                        .then((result) => {
                            const favoriteAds = JSON.parse(result.favoriteAds.replace(/'/g, '"'))
                            if (favoriteAds.includes(adId) == false) {
                                return res.json({ status: 'success', isFavorite: false })
                            } else if (favoriteAds.includes(adId) == true) {
                                return res.json({ status: 'success', isFavorite: true })
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    } else if (request.requestType == 'getAd') {
        const adId = request.adId

        Ads.findById(adId)
            .then((result) => {
                const ad = JSON.parse(result.ads)
                return res.json({ status: 'success', "adData": ad })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = distribution;