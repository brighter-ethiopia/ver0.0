const fs = require('fs')
const db = require('../routes/db-config')

const distribution = async (req, res) => {
    if (req.body.requestType.split('@')[0] == 'genrePreference') {
        const user = JSON.parse(req.body.requestType.split('@').pop())
        db.query('SELECT userGenrePreference FROM users WHERE username = ?', [user.username], (error, results) => {
            if (error) throw error;
            return res.json({ status: 'success', genrePreferenceArray: results[0].userGenrePreference })
        })
    } else if (req.body.requestType.split('@')[0] == 'watchlist') {
        const user = JSON.parse(req.body.requestType.split('@').pop())
        db.query('SELECT watchlist FROM users WHERE username = ?', [user.username], (error, results) => {
            if (error) throw error;
            const watchlistArr = JSON.parse(results[0].watchlist.replaceAll('*', '"'))
            return res.json({ status: 'success', watchlistResponse: watchlistArr})
        })
    } else if (req.body.requestType.split('@')[0] == 'addToWatchlist') {
        const user = JSON.parse(req.body.requestType.split('@').pop().split('^')[0])
        const videoFileName_Type = req.body.requestType.split('^').pop().toLowerCase()
        db.query('SELECT watchlist FROM users WHERE username = ?', [user.username], (error, results) => {
            if (error) throw error;
            const previousWatchlistArr = JSON.parse(results[0].watchlist.replaceAll('*', '"'))
            let list = []
            for (var i = 0; i < previousWatchlistArr.length; i++) {
                list.push(previousWatchlistArr[i].substring(previousWatchlistArr[i].indexOf(":") + 1).split('#')[0])
            }
            if (list.includes(videoFileName_Type.split(':').pop()) == false) {
                previousWatchlistArr.push(`${videoFileName_Type}#${new Date()}`)
                const updatedWatchlistArr = JSON.stringify(previousWatchlistArr).replaceAll('"', '*')
                db.query('UPDATE users SET watchlist = ? WHERE username = ?', [`${updatedWatchlistArr}`, user.username], (error, results) => {
                    if (error) throw error;
                    return res.json({ status: 'success', watchlistResponse: 'addedToWatchlist' })
                })
            }
        })
    } else if (req.body.requestType.split('@')[0] == 'removeFromWatchlist') {
        const user = JSON.parse(req.body.requestType.split('@').pop().split('^')[0])
        const videoFileName_Type = req.body.requestType.split('^').pop().toLowerCase()
        db.query('SELECT watchlist FROM users WHERE username = ?', [user.username], (error, results) => {
            if (error) throw error;
            const previousWatchlistArr = JSON.parse(results[0].watchlist.replaceAll('*', '"'))
            for (var i = 0; i < previousWatchlistArr.length; i++) {
                if (previousWatchlistArr[i].substring(previousWatchlistArr[i].indexOf(":") + 1).split('#')[0] == videoFileName_Type.split(':').pop()) {
                    const index = previousWatchlistArr.indexOf(previousWatchlistArr[i])
                    if (index > -1) {
                        previousWatchlistArr.splice(index, 1)
                    }
                }
            }
            const updatedWatchlistArr = JSON.stringify(previousWatchlistArr).replaceAll('"', '*')
            db.query('UPDATE users SET watchlist = ? WHERE username = ?', [`${updatedWatchlistArr}`, user.username], (error, results) => {
                if (error) throw error;
                return res.json({ status: 'success', watchlistResponse: 'removedFromWatchlist' })
            })
        })
    } else if (req.body.requestType.split('@')[0] == 'mainPoster') {
        fs.readFile('../spree/videoNas/address/mainPoster.txt', 'utf8', function (err, addressData) {
            if (err) {
                console.log(err)
                return res.json({ status: 'error', error: 'something went wrong!' })
            }
            fs.readFile(`../spree/videoNas/${Object.keys(JSON.parse(addressData)[0])[0].replace("_", "-")}/${Object.values(JSON.parse(addressData)[0])[0]}/meta/meta.txt`, 'utf8', function (err, metaData) {
                if (err) {
                    console.log(err)
                    return res.json({ status: 'error', error: 'something went wrong!' })
                }
                const user = JSON.parse(req.body.requestType.split('@').pop())
                db.query('SELECT watchlist FROM users WHERE username = ?', [user.username], (error, results) => {
                    if (error) throw error;
                    const watchlistArr = JSON.parse(results[0].watchlist.replaceAll('*', '"'))
                    if (watchlistArr.length > 0) {
                        let list = []
                        for (var i = 0; i < watchlistArr.length; i++) {
                            list.push(watchlistArr[i].substring(watchlistArr[i].indexOf(":") + 1).split('#')[0])
                        }
                        if (list.includes(Object.values(JSON.parse(addressData)[0])[0].toLowerCase())) {
                            return res.json({ status: 'success', addressData: addressData, metaData: metaData, watchlistResponse: 'saved'})
                        } else {
                            return res.json({ status: 'success', addressData: addressData, metaData: metaData, watchlistResponse: 'not saved'})
                        }
                    } else {
                        return res.json({ status: 'success', addressData: addressData, metaData: metaData, watchlistResponse: 'not saved'})
                    }
                })
            })
        })
    } else if (req.body.requestType == 'subPosterTv') {
        fs.readFile('../spree/videoNas/address/subPosterTv.txt', 'utf8', function (err, addressData) {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            fs.readFile(`../spree/videoNas/${Object.keys(JSON.parse(addressData)[0])[0].replace("_", "-")}/${Object.values(JSON.parse(addressData)[0])[0]}/meta/meta.txt`, 'utf8', function (err, metaData) {
                if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
                return res.json({ status: 'success', addressData: addressData, metaData: metaData })
            })
        })
    } else if (req.body.requestType == 'subPosterMovie') {
        fs.readFile('../spree/videoNas/address/subPosterMovie.txt', 'utf8', function (err, addressData) {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            fs.readFile(`../spree/videoNas/${Object.keys(JSON.parse(addressData)[0])[0].replace("_", "-")}/${Object.values(JSON.parse(addressData)[0])[0]}/meta/meta.txt`, 'utf8', function (err, metaData) {
                if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
                return res.json({ status: 'success', addressData: addressData, metaData: metaData })
            })
        })
    } else if (req.body.requestType == 'popular_tv') {
        fs.readFile('../spree/videoNas/tv-show/admin-address/popular.txt', 'utf8', function (err, data) {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            return res.json({ status: 'success', popularArray: data })
        })
    } else if (req.body.requestType == 'popular_movie') {
        fs.readFile('../spree/videoNas/movie/admin-address/popular.txt', 'utf8', function (err, data) {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            return res.json({ status: 'success', popularArray: data })
        })
    } else if (req.body.requestType == 'trending') {
        fs.readFile('../spree/videoNas/address/newlyAdded.txt', 'utf8', function (err, data) {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            return res.json({ status: 'success', trendingArray: data })
        })
    } else if (req.body.requestType == 'newlyAdded') {
        fs.readFile('../spree/videoNas/address/newlyAdded.txt', 'utf8', function (err, data) {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            return res.json({ status: 'success', newlyAddedArray: data })
        })
    } else if (req.body.requestType.split('@')[0] == 'updateKeepWatching') {
        const currentKeepwatchingObject  = JSON.parse(req.body.requestType.split('!').pop().replaceAll('$', '{').replaceAll('%', '}').replaceAll('*', '"'))
        const user = JSON.parse(req.body.requestType.split('@').pop().split('!')[0].replaceAll('$', '{').replaceAll('%', '}'))
        db.query('SELECT keepWatching FROM users WHERE username = ?', [user.username], (error, results) => {
            if (error) throw error;
            const previousKeepWatchingArr = JSON.parse(results[0].keepWatching.replaceAll('$', '{').replaceAll('%', '}').replaceAll('*', '"'))
            let list = []
            for (var i = 0; i < previousKeepWatchingArr.length; i++) {
                if (Object.keys(currentKeepwatchingObject)[0] == 'tvShow') {
                    if (previousKeepWatchingArr[i].tvShow != currentKeepwatchingObject.tvShow) {
                        list.push(previousKeepWatchingArr[i])
                    }
                } else if (Object.keys(currentKeepwatchingObject)[0] == 'movie') {
                    if (previousKeepWatchingArr[i].movie != currentKeepwatchingObject.movie) {
                        list.push(previousKeepWatchingArr[i])
                    }
                }
            }
            list.push(currentKeepwatchingObject)
            const updatedList = JSON.stringify(list).replaceAll('{', '$').replaceAll('}', '%').replaceAll('"', '*')
            db.query('UPDATE users SET keepWatching = ? WHERE username = ?', [`${updatedList}`, user.username], (error, results) => {
                if (error) throw error;
                return res.json({ status: 'success', keepWatchingResponse: 'keepwatchingUpdated' })
            })
        })
    } else if (req.body.requestType.split('@')[0] == 'removeKeepWatching') {
        const currentKeepwatchingObject  = JSON.parse(req.body.requestType.split('!').pop().replaceAll('$', '{').replaceAll('%', '}').replaceAll('*', '"'))
        const user = JSON.parse(req.body.requestType.split('@').pop().split('!')[0].replaceAll('$', '{').replaceAll('%', '}'))
        db.query('SELECT keepWatching FROM users WHERE username = ?', [user.username], (error, results) => {
            if (error) throw error;
            const previousKeepWatchingArr = JSON.parse(results[0].keepWatching.replaceAll('$', '{').replaceAll('%', '}').replaceAll('*', '"'))
            let list = []
            for (var i = 0; i < previousKeepWatchingArr.length; i++) {
                if (Object.keys(currentKeepwatchingObject)[0] == 'tvShow') {
                    if (previousKeepWatchingArr[i].tvShow != currentKeepwatchingObject.tvShow) {
                        list.push(previousKeepWatchingArr[i])
                    }
                } else if (Object.keys(currentKeepwatchingObject)[0] == 'movie') {
                    if (previousKeepWatchingArr[i].movie != currentKeepwatchingObject.movie) {
                        list.push(previousKeepWatchingArr[i])
                    }
                }
            }
            const updatedList = JSON.stringify(list).replaceAll('{', '$').replaceAll('}', '%').replaceAll('"', '*')
            db.query('UPDATE users SET keepWatching = ? WHERE username = ?', [`${updatedList}`, user.username], (error, results) => {
                if (error) throw error;
                return res.json({ status: 'success', keepWatchingResponse: 'keepwatchingUpdated' })
            })
        })
    } else if (req.body.requestType.split('!')[0] == 'search') {
        const searchString = req.body.requestType.split('!').pop().toLowerCase()
        let movie_tv = []
        let valuesArr = []
        fs.readdir(`../spree/videoNas/movie`, (err, files) => {
            if (err) {
                console.log(err)
                return res.json({ status: 'error', error: 'something went wrong!' })
            }
            files.forEach(file => {
                if (file.includes('-') == false) {
                    if (file.toLowerCase().includes(searchString)) {
                        movie_tv.push(`{"movie":"${file.toLowerCase()}"}`);
                    }
                }
            });
            fs.readdir(`../spree/videoNas/tv-show`, (err, files) => {
                if (err) {
                    console.log(err)
                    return res.json({ status: 'error', error: 'something went wrong!' })
                }
                files.forEach(file => {
                    if (file.includes('-') == false) {
                        if (file.toLowerCase().includes(searchString)) {
                            movie_tv.push(`{"tv-show":"${file.toLowerCase()}"}`);
                        }
                    }
                });

                for (var i = 0; i < movie_tv.length; i++) {
                    const value = Object.values(JSON.parse(movie_tv[i]))[0]
                    if (value.toLowerCase().includes(searchString)) {
                        valuesArr.push(value.toLowerCase())
                    }
                }

                const startsWith = (string, value) => string.substring(0, value.length).toLowerCase() === value
                const sorted = valuesArr.sort((a, b) => {
                    const aStartsWith = startsWith(a, searchString)
                    const bStartsWith = startsWith(b, searchString)

                    if (aStartsWith && !bStartsWith) {
                        return -1
                    } else if (!aStartsWith && bStartsWith) {
                        return 1;
                    }

                    return b > a ? -1 : 1
                })

                let finalArr = []
                for (var i = 0; i < movie_tv.length; i++) {
                    const parsedMovie_tv = JSON.parse(movie_tv[i])
                    const key = Object.keys(parsedMovie_tv)[0]
                    const value = Object.values(parsedMovie_tv)[0]
                    finalArr[sorted.indexOf(value)] = (`{"${key}":"${value}"}`)
                }
                return res.json({ status: 'success', searchResults: finalArr})
            });
        });
    } else if (req.body.requestType.split('_')[0] == 'recentSearches') {
        const user = JSON.parse(req.body.requestType.substring(req.body.requestType.indexOf("_") + 1).split('!')[0])
        const videoFileName_Type = req.body.requestType.split('!').pop()
        db.query('SELECT recentSearches FROM users WHERE username = ?', [user.username], (error, results) => {
            if (error) throw error;
            const previousRecentSearchesArr = JSON.parse(results[0].recentSearches.replaceAll('*', '"'))
            let list = []
            for (var i = 0; i < previousRecentSearchesArr.length; i++) {
                list.push(previousRecentSearchesArr[i].substring(previousRecentSearchesArr[i].indexOf(":") + 1).split('#')[0])
            }
            if (list.includes(videoFileName_Type.split(':').pop()) == false) {
                previousRecentSearchesArr.push(videoFileName_Type)
                const updatedRecentSearchesArr = JSON.stringify(previousRecentSearchesArr).replaceAll('"', '*')
                db.query('UPDATE users SET recentSearches = ? WHERE username = ?', [`${updatedRecentSearchesArr}`, user.username], (error, results) => {
                    if (error) throw error;
                    return res.json({ status: 'success', recentSearches: 'addedToRecentSearches' })
                })
            }
        })
    } else if (req.body.requestType == 'movieForYou') {
        fs.readdir(`../spree/videoNas/movie`, (err, files) => {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            let movieForYouArray = []
            files.forEach(file => {
                if (file.includes('-') == false) {
                    movieForYouArray.push(file)
                }
            });
            return res.json({ status: 'success', movieForYouArray: movieForYouArray })
        });
    } else if (req.body.requestType == 'tvForYou') {
        fs.readdir(`../spree/videoNas/tv-show`, (err, files) => {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            let tvForYouArray = []
            files.forEach(file => {
                if (file.includes('-') == false) {
                    tvForYouArray.push(file)
                }
            });
            return res.json({ status: 'success', tvForYouArray: tvForYouArray })
        });
    } else if (req.body.requestType.substring(0, req.body.requestType.indexOf('@')) == 'detailsConstruction') {
        const type = req.body.requestType.split('!').pop().split(':')[0].replace('_', '-')
        const name = req.body.requestType.split(':').pop().replaceAll('%20', ' ').toLowerCase()
        fs.readFile(`../spree/videoNas/${type}/${name}/meta/meta.txt`, 'utf8', function (err, data) {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            const user = JSON.parse(req.body.requestType.split('@').pop().split('!')[0])
            db.query('SELECT watchlist FROM users WHERE username = ?', [user.username], (error, results) => {
                if (error) throw error;
                const watchlistArr = JSON.parse(results[0].watchlist.replaceAll('*', '"'))
                if (watchlistArr.length > 0) {
                    let list = []
                    for (var i = 0; i < watchlistArr.length; i++) {
                        list.push(watchlistArr[i].substring(watchlistArr[i].indexOf(":") + 1).split('#')[0])
                    }
                    if (list.includes(name)) {
                        return res.json({ status: 'success', metaData: data, type: type, watchlistResponse: 'saved'})
                    } else {
                        return res.json({ status: 'success', metaData: data, type: type, watchlistResponse: 'not saved'})
                    }
                } else {
                    return res.json({ status: 'success', metaData: data, type: type, watchlistResponse: 'not saved'})
                }
            })
        })
    } else if (req.body.requestType.split('!')[0] == 'seasonCount') {
        const title = req.body.requestType.split('!').pop()
        fs.readdir(`../spree/videoNas/tv-show/${title}/seasons`, (err, files) => {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            let seasonCountArray = []
            files.forEach(file => {
                seasonCountArray.push(file)
            });
            return res.json({ status: 'success', seasonCountArray: seasonCountArray })
        });
    } else if (req.body.requestType.substring(0, req.body.requestType.indexOf('!')) == 'videoData') {
        fs.readdir(`../spree/videoNas/tv-show/${req.body.requestType.split('!').pop().split('_')[0].toLowerCase()}/seasons/${req.body.requestType.split("_").pop().replace(' ', '').toLowerCase()}`, (err, files) => {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            let videoMetaArray = []
            files.forEach(file => {
                videoMetaArray.push(file)
            });
            const formatedVideoMetaArray = videoMetaArray.sort((a, b) => +a.match(/\d+/)[0] - b.match(/\d+/)[0]);

            return res.json({ status: 'success', videoMetaArray: formatedVideoMetaArray })
        });
    } else if (req.body.requestType == 'genreFile:tv') {
        fs.readFile(`../spree/videoNas/tv-show/admin-address/genre.txt`, 'utf8', function (err, data) {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            return res.json({ status: 'success', genreFile_tvArray: data })
        })
    } else if (req.body.requestType == 'genreFile:movie') {
        fs.readFile(`../spree/videoNas/movie/admin-address/genre.txt`, 'utf8', function (err, data) {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            return res.json({ status: 'success', genreFile_movieArray: data })
        })
    } else if (req.body.requestType == 'genreFile:tv+movie') {
        let genreFile_tv_movieArray = []
        fs.readFile(`../spree/videoNas/tv-show/admin-address/genre.txt`, 'utf8', function (err, data) {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            genreFile_tv_movieArray.push(data)
            fs.readFile(`../spree/videoNas/movie/admin-address/genre.txt`, 'utf8', function (error, data2) {
                if (err) { 
                    console.log(err) 
                    return res.json({ status: 'error', error: 'something went wrong!' }) 
                }
                genreFile_tv_movieArray.push(data2)
                return res.json({ status: 'success', genreFile_tv_movieArray: genreFile_tv_movieArray })
            })
        })
    } else if (req.body.requestType.split('!')[0] == 'episodeNeighbours') {
        const dir = `../spree${req.body.requestType.split('!').pop()}`
        fs.readdir(dir, (err, files) => {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            let episodeNeighboursArray = []
            files.forEach(file => {
                episodeNeighboursArray.push(file)
            });
            return res.json({ status: 'success', episodeNeighboursArray: episodeNeighboursArray })
        });
    } else if (req.body.requestType.split('!')[0] == 'seasonNeighbours') {
        const dir = `../spree${req.body.requestType.split('!').pop()}`
        fs.readdir(dir, (err, files) => {
            if (err) { 
                console.log(err) 
                return res.json({ status: 'error', error: 'something went wrong!' }) 
            }
            let seasonNeighboursArray = []
            files.forEach(file => {
                seasonNeighboursArray.push(file)
            });
            return res.json({ status: 'success', seasonNeighboursArray: seasonNeighboursArray })
        });
    }
}

module.exports = distribution;