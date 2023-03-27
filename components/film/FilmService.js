const FilmModel = require("./FilmModel");

const getFilm = async (_limit, _page) => {
  try {
    if (!_limit || !_page) {
      const films = await FilmModel.find();
      return { data: films };
    } else {
      const countOfDocument = await FilmModel.count({});
      console.log(countOfDocument);
      const startIndex = (Number(_page) - 1) * _limit;
      const endIndex = Number(_page) * Number(_limit);
      const totalPage = Math.ceil(countOfDocument / Number(_limit));

      const result = {};

      result.totalPage = totalPage;
      if (endIndex < countOfDocument) {
        result.next = { page: Number(_page) + 1, limit: _limit };
      }

      if (startIndex > 0) {
        result.previous = { page: Number(_page) - 1, limit: _limit };
      }
      result.data = await FilmModel.find().skip(startIndex).limit(_limit);

      return result;
    }
  } catch (error) {
    console.log("getFilm: " + error);
  }
};

const addFilm = async (
  filmName,
  trailerID,
  total_episode,
  list_category,
  synopsis,
  _id_collection,
  imageList = {}
) => {
  try {
    const result = await FilmModel.create({
      name: filmName,
      trailer: trailerID,
      total_episode: total_episode,
      list_category: list_category,
      synopsis: synopsis,
      thumbnail: {
        filename: imageList.thumbnail[0].filename,
        path: imageList.thumbnail[0].path,
      },
      background_medium: {
        filename: imageList.background_medium[0].filename,
        path: imageList.background_medium[0].path,
      },
      _id_collection: _id_collection,
    });
    // console.log(result.);
    if (result) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.log("addFilm: " + error);
    return result;
  }
};

const getFilmById = async (_id) => {
  try {
    const film = await FilmModel.findById(_id);
    if (film) {
      return film;
    }
    return null;
  } catch (error) {
    console.log("getFilmById: " + error);
  }
};

const updateFilmById = async (
  _id,
  filmName,
  trailerID,
  total_episode,
  list_category,
  synopsis,
  __id_collection,
  imageList = {}
) => {
  try {
    const oldResult = await FilmModel.findById(_id);
    const result = await FilmModel.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          name: filmName,
          trailer: trailerID,
          total_episode: total_episode,
          list_category: list_category,
          synopsis: synopsis,
          thumbnail:
            JSON.stringify(imageList) !== "{}" &&
            imageList.thumbnail[0].filename
              ? {
                  filename: imageList.thumbnail[0].filename,
                  path: imageList.thumbnail[0].path,
                }
              : oldResult.thumbnail,
          background_medium:
            JSON.stringify(imageList) !== "{}" &&
            imageList.background_medium[0].filename
              ? {
                  filename: imageList.background_medium[0].filename,
                  path: imageList.background_medium[0].path,
                }
              : oldResult.background_medium,
          _id_collection: __id_collection,
        },
      }
    );

    if (result) {
      return result;
    } else {
      return result;
    }
  } catch (error) {
    console.log("updateFilmById: " + error);
    return result;
  }
};

module.exports = { getFilm, addFilm, getFilmById, updateFilmById };

const DATA = [
  {
    _id: 1,
    name: "Cape Pole Seaplane Base",
    trailer: "Z71",
    like: 48,
    score: "05-134-0814",
    total_episode: 58,
    list_category: [{}, {}],
    list_episode: [{}],
    synopsis:
      "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT57DE44R885BS545ZMS",
  },
  {
    _id: 2,
    name: "Santa Paula Airport",
    trailer: "SISP",
    like: 58,
    score: "60-491-6763",
    total_episode: 93,
    list_category: [{}],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis:
      "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT5D9VPMXKVKR26SM79Q",
  },
  {
    _id: 3,
    name: "Heathlands Airport",
    trailer: "YHTL",
    like: 50,
    score: "98-205-2890",
    total_episode: 22,
    list_category: [{}],
    list_episode: [{}],
    synopsis:
      "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT5HWZEDB8MJS428VP0T",
  },
  {
    _id: 4,
    name: "Marion County Rankin Fite Airport",
    trailer: "KHAB",
    like: 89,
    score: "85-079-5341",
    total_episode: 64,
    list_category: [{}],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis:
      "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT5PFR0AGW8Z4HY28G6P",
  },
  {
    _id: 5,
    name: "Lebanon Municipal Airport",
    trailer: "KLEB",
    like: 12,
    score: "53-369-2269",
    total_episode: 82,
    list_category: [{}],
    list_episode: [],
    synopsis:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT5VXF3Z11DG9PD76PRY",
  },
  {
    _id: 6,
    name: "San Gabriel Valley Airport",
    trailer: "KEMT",
    like: 89,
    score: "15-133-4871",
    total_episode: 70,
    list_category: [{}, {}],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT5ZGQXPJDNQA43NQQAF",
  },
  {
    _id: 7,
    name: "North Las Vegas Airport",
    trailer: "KVGT",
    like: 6,
    score: "82-516-7191",
    total_episode: 4,
    list_category: [{}, {}, {}],
    list_episode: [{}, {}],
    synopsis:
      "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT64YFH5AVH3Z2ZMF8JX",
  },
  {
    _id: 8,
    name: "Ylivieska Airfield",
    trailer: "EFYL",
    like: 83,
    score: "11-886-0095",
    total_episode: 79,
    list_category: [{}, {}],
    list_episode: [{}, {}, {}],
    synopsis:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT682V88R1E55TEPZWF8",
  },
  {
    _id: 9,
    name: "Jagdalpur Airport",
    trailer: null,
    like: 60,
    score: "90-245-3235",
    total_episode: 43,
    list_category: [{}, {}],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT6DTNESWSQ4WC7GW3KY",
  },
  {
    _id: 10,
    name: "El Dorado Airport",
    trailer: "SVED",
    like: 48,
    score: "06-681-6192",
    total_episode: 59,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT6HT7706G91F1SDQM1P",
  },
  {
    _id: 11,
    name: "Ivujivik Airport",
    trailer: "CYIK",
    like: 2,
    score: "11-182-7030",
    total_episode: 63,
    list_category: [],
    list_episode: [],
    synopsis:
      "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT6PAJ9DDH0KQWP6W9MJ",
  },
  {
    _id: 12,
    name: "Sialkot Airport",
    trailer: "OPST",
    like: 8,
    score: "98-548-2083",
    total_episode: 14,
    list_category: [{}, {}, {}, {}],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT6VBRPZR9KZWZ8N8WBZ",
  },
  {
    _id: 13,
    name: "Westray Airport",
    trailer: "EGEW",
    like: 55,
    score: "35-301-7668",
    total_episode: 34,
    list_category: [{}, {}, {}, {}],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT6Z3HM0397A9S6T8XMQ",
  },
  {
    _id: 14,
    name: "Kerman Airport",
    trailer: "OIKK",
    like: 32,
    score: "44-006-9583",
    total_episode: 39,
    list_category: [{}],
    list_episode: [{}, {}],
    synopsis:
      "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT74AT8NT84S9WXXNV5X",
  },
  {
    _id: 15,
    name: "Mc Clellan Airfield",
    trailer: "KMCC",
    like: 47,
    score: "82-005-2815",
    total_episode: 26,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT78JY97TAJVPAHYKQVM",
  },
  {
    _id: 16,
    name: "Muhammad Salahuddin Airport",
    trailer: "WADB",
    like: 9,
    score: "93-300-9984",
    total_episode: 57,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}, {}, {}],
    synopsis:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT7D0TRX9Y3NDF92BE3T",
  },
  {
    _id: 17,
    name: "Exeter International Airport",
    trailer: "EGTE",
    like: 11,
    score: "11-317-8640",
    total_episode: 59,
    list_category: [{}],
    list_episode: [{}],
    synopsis:
      "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT7HW2BP292SDEVRNDYP",
  },
  {
    _id: 18,
    name: "Findlay Airport",
    trailer: "KFDY",
    like: 63,
    score: "63-162-2033",
    total_episode: 73,
    list_category: [{}],
    list_episode: [{}, {}],
    synopsis:
      "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT7NCMP9W2P5YSJYVHE9",
  },
  {
    _id: 19,
    name: "Esler Regional Airport",
    trailer: "KESF",
    like: 76,
    score: "93-410-2547",
    total_episode: 76,
    list_category: [{}, {}],
    list_episode: [],
    synopsis:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT7T2G7EQHNT2ZSCGDDQ",
  },
  {
    _id: 20,
    name: "Sucua Airport",
    trailer: "SESC",
    like: 73,
    score: "31-137-4613",
    total_episode: 98,
    list_category: [{}, {}],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT80CBNCXXH4KTCQT9PE",
  },
  {
    _id: 21,
    name: "Ine Airport",
    trailer: null,
    like: 59,
    score: "14-714-7931",
    total_episode: 53,
    list_category: [{}],
    list_episode: [{}, {}, {}],
    synopsis:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT85EZ9ZXTG752AR39ZS",
  },
  {
    _id: 22,
    name: "Nukutepipi Airport",
    trailer: "NTKU",
    like: 67,
    score: "97-149-0905",
    total_episode: 96,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}],
    synopsis:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT8A6HJPNAZFMF3CD3CT",
  },
  {
    _id: 23,
    name: "Labasa Airport",
    trailer: "NFNL",
    like: 34,
    score: "15-543-5716",
    total_episode: 50,
    list_category: [{}],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis:
      "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT8E7K0F26BN9E9XJ0CA",
  },
  {
    _id: 24,
    name: "Manja Airport",
    trailer: "FMSJ",
    like: 99,
    score: "26-102-0652",
    total_episode: 57,
    list_category: [{}, {}, {}],
    list_episode: [{}, {}],
    synopsis: "In congue. Etiam justo. Etiam pretium iaculis justo.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT8J0JDPK0NEQJC0SSMR",
  },
  {
    _id: 25,
    name: "Afyon Airport",
    trailer: "LTAH",
    like: 26,
    score: "28-378-0323",
    total_episode: 2,
    list_category: [{}, {}],
    list_episode: [{}, {}],
    synopsis:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT8PSMXPE42E7QC36DH5",
  },
  {
    _id: 26,
    name: "Sir Abubakar Tafawa Balewa International Airport",
    trailer: "DNBC",
    like: 85,
    score: "44-487-1868",
    total_episode: 20,
    list_category: [{}, {}],
    list_episode: [],
    synopsis:
      "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT8V5V5RWQHQHZW3SQES",
  },
  {
    _id: 27,
    name: "Roberts Field",
    trailer: "KRDM",
    like: 64,
    score: "32-884-1460",
    total_episode: 86,
    list_category: [{}, {}, {}],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT8ZPAFQD3DCQ6E4WK9A",
  },
  {
    _id: 28,
    name: "Zahn's Airport",
    trailer: null,
    like: 67,
    score: "79-772-3035",
    total_episode: 47,
    list_category: [{}, {}, {}],
    list_episode: [{}],
    synopsis:
      "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT94WNB9647DDYVDB7ZD",
  },
  {
    _id: 29,
    name: "Boone County Airport",
    trailer: "KHRO",
    like: 78,
    score: "86-968-7912",
    total_episode: 95,
    list_category: [{}],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT985X4RNASQGPK9VARB",
  },
  {
    _id: 30,
    name: "Gbadolite Airport",
    trailer: "FZFD",
    like: 76,
    score: "46-766-3252",
    total_episode: 37,
    list_category: [{}, {}, {}],
    list_episode: [{}, {}],
    synopsis:
      "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT9D9ASV0EFQZ2N121P6",
  },
  {
    _id: 31,
    name: "Virginia Airport",
    trailer: "FAVG",
    like: 44,
    score: "86-945-7652",
    total_episode: 84,
    list_category: [{}, {}],
    list_episode: [],
    synopsis:
      "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT9HXW5CE8XS8QHZSKG5",
  },
  {
    _id: 32,
    name: "Bahia Piña Airport",
    trailer: null,
    like: 47,
    score: "29-522-0597",
    total_episode: 100,
    list_category: [{}, {}, {}],
    list_episode: [{}],
    synopsis:
      "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT9NTPYWXF2QJG0Z6C0X",
  },
  {
    _id: 33,
    name: "Burgos Airport",
    trailer: "LEBG",
    like: 77,
    score: "89-247-7370",
    total_episode: 15,
    list_category: [],
    list_episode: [{}, {}],
    synopsis:
      "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTT9TQ0PT4DR09J5XDH55",
  },
  {
    _id: 34,
    name: "Carta Airport",
    trailer: "MHCR",
    like: 92,
    score: "30-423-6809",
    total_episode: 64,
    list_category: [{}, {}],
    list_episode: [{}, {}, {}],
    synopsis:
      "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTA0RTS0H0XZCHTMB9EZ",
  },
  {
    _id: 35,
    name: "Jorge Newbery Airpark",
    trailer: "SABE",
    like: 100,
    score: "77-981-3163",
    total_episode: 75,
    list_category: [],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTA5CW6PKGCZ5ZKNA0QK",
  },
  {
    _id: 36,
    name: "Moba Airport",
    trailer: "FZRB",
    like: 49,
    score: "18-772-9058",
    total_episode: 3,
    list_category: [{}, {}],
    list_episode: [{}],
    synopsis:
      "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTAA9DG2TXR5T6ZJA0ZY",
  },
  {
    _id: 37,
    name: "Angoram Airport",
    trailer: null,
    like: 63,
    score: "87-653-5347",
    total_episode: 70,
    list_category: [{}, {}],
    list_episode: [{}, {}],
    synopsis:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTAFY1RF1W60S094TKHR",
  },
  {
    _id: 38,
    name: "Kalat Airport",
    trailer: "OPKL",
    like: 25,
    score: "33-419-6644",
    total_episode: 34,
    list_category: [{}],
    list_episode: [],
    synopsis:
      "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTAMPEE52RGZBDEMDVJG",
  },
  {
    _id: 39,
    name: "Gloucestershire Airport",
    trailer: "EGBJ",
    like: 43,
    score: "85-796-4762",
    total_episode: 58,
    list_category: [{}, {}],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis:
      "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTASDBFAK8K648P1S57Z",
  },
  {
    _id: 40,
    name: "Yibin Caiba Airport",
    trailer: "ZUYB",
    like: 74,
    score: "26-388-9440",
    total_episode: 18,
    list_category: [{}],
    list_episode: [{}, {}, {}],
    synopsis:
      "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTAXN2B3CJH9STNE1MQF",
  },
  {
    _id: 41,
    name: "Taoxian Airport",
    trailer: "ZYTX",
    like: 66,
    score: "70-827-9195",
    total_episode: 19,
    list_category: [],
    list_episode: [{}, {}, {}],
    synopsis:
      "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTB28M4SJVYP87DHZG44",
  },
  {
    _id: 42,
    name: "Thylungra Airport",
    trailer: "YTHY",
    like: 87,
    score: "01-327-2921",
    total_episode: 1,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTB6GFDN1Z4ZP5MME9G9",
  },
  {
    _id: 43,
    name: "Sligo Airport",
    trailer: "EISG",
    like: 14,
    score: "75-141-8856",
    total_episode: 29,
    list_category: [],
    list_episode: [{}],
    synopsis:
      "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTBBBA9K4FFST708QDV1",
  },
  {
    _id: 44,
    name: "Laverton Airport",
    trailer: "YLTN",
    like: 54,
    score: "38-489-4170",
    total_episode: 83,
    list_category: [{}, {}, {}],
    list_episode: [],
    synopsis:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTBFWJR054WT238EZS4N",
  },
  {
    _id: 45,
    name: "Rivers Airport",
    trailer: null,
    like: 72,
    score: "27-265-3104",
    total_episode: 98,
    list_category: [{}, {}, {}],
    list_episode: [],
    synopsis:
      "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTBKNRKAKKK3CHQTVX2Z",
  },
  {
    _id: 46,
    name: "Fort MacKay/Albian Aerodrome",
    trailer: "CAL4",
    like: 20,
    score: "85-757-2893",
    total_episode: 10,
    list_category: [{}, {}],
    list_episode: [{}],
    synopsis:
      "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTBSV1T1WQPP9D4BBAH7",
  },
  {
    _id: 47,
    name: "Skiros Airport",
    trailer: "LGSY",
    like: 59,
    score: "58-459-6235",
    total_episode: 26,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTBWRNCJH246VDS320Z5",
  },
  {
    _id: 48,
    name: "Los Colonizadores Airport",
    trailer: "SKSA",
    like: 78,
    score: "34-949-1331",
    total_episode: 91,
    list_category: [],
    list_episode: [{}, {}],
    synopsis:
      "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTC1YQQA7NHYG938SCHZ",
  },
  {
    _id: 49,
    name: "Malatya Erhaç Airport",
    trailer: "LTAT",
    like: 53,
    score: "56-408-7046",
    total_episode: 7,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}, {}, {}],
    synopsis:
      "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTC4KWCEWB9W7M8J2M8A",
  },
  {
    _id: 50,
    name: "Morombe Airport",
    trailer: "FMSR",
    like: 74,
    score: "77-310-2565",
    total_episode: 32,
    list_category: [{}, {}],
    list_episode: [{}],
    synopsis:
      "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTC7W67BGV26TZABRNTC",
  },
  {
    _id: 51,
    name: "Taean Airport",
    trailer: "RKTA",
    like: 95,
    score: "68-532-3999",
    total_episode: 35,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [],
    synopsis:
      "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTCAGK01MTS4N43F9QAJ",
  },
  {
    _id: 52,
    name: "Beersheba (Teyman) Airport",
    trailer: "LLBS",
    like: 32,
    score: "02-533-8160",
    total_episode: 41,
    list_category: [{}],
    list_episode: [{}, {}],
    synopsis:
      "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTCDRRZP1T2MH0WYGHHN",
  },
  {
    _id: 53,
    name: "Sary-Arka Airport",
    trailer: "UAKK",
    like: 88,
    score: "24-994-0454",
    total_episode: 18,
    list_category: [{}, {}, {}, {}],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis:
      "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTCGGKV8PBW1YYF15XW5",
  },
  {
    _id: 54,
    name: "Schefferville Airport",
    trailer: "CYKL",
    like: 62,
    score: "28-141-9274",
    total_episode: 48,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [],
    synopsis:
      "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTCK71Q7CP7P04N8BXWB",
  },
  {
    _id: 55,
    name: "Sullivan County International Airport",
    trailer: "KMSV",
    like: 23,
    score: "95-836-9921",
    total_episode: 11,
    list_category: [{}],
    list_episode: [],
    synopsis:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTCP4AKRGHD9AMWN3XJS",
  },
  {
    _id: 56,
    name: "Resende Airport",
    trailer: "SDRS",
    like: 96,
    score: "15-295-3227",
    total_episode: 82,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}, {}, {}],
    synopsis:
      "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTCT08JCHWX6702QP0TG",
  },
  {
    _id: 57,
    name: "Lowe AHP (Fort Rucker) Heliport",
    trailer: "KLOR",
    like: 9,
    score: "41-516-3677",
    total_episode: 55,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis:
      "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTCZXK3DRQXWRZBQ5R8P",
  },
  {
    _id: 58,
    name: "Penzance Heliport",
    trailer: "EGHK",
    like: 14,
    score: "56-347-0599",
    total_episode: 43,
    list_category: [],
    list_episode: [{}, {}],
    synopsis:
      "In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTD4XV3WVQPA39WMMCXR",
  },
  {
    _id: 59,
    name: "Shiyan Wudangshan Airport",
    trailer: "ZHSY",
    like: 2,
    score: "06-431-1990",
    total_episode: 13,
    list_category: [],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis: "In congue. Etiam justo. Etiam pretium iaculis justo.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTD7MQR3CMB5RVX20CNE",
  },
  {
    _id: 60,
    name: "Garasa Airport",
    trailer: "AYGG",
    like: 77,
    score: "74-581-6188",
    total_episode: 14,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}, {}, {}],
    synopsis:
      "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTDAZPZPDK80QSTEDFQ0",
  },
  {
    _id: 61,
    name: "Mariupol International Airport",
    trailer: "UKCM",
    like: 78,
    score: "02-555-8436",
    total_episode: 58,
    list_category: [],
    list_episode: [{}, {}, {}],
    synopsis:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTDD7XM9P7N9VCJETYGT",
  },
  {
    _id: 62,
    name: "Hat Yai International Airport",
    trailer: "VTSS",
    like: 20,
    score: "74-331-9097",
    total_episode: 46,
    list_category: [{}, {}, {}],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTDHKBB6VRJ6RCQDK1WK",
  },
  {
    _id: 63,
    name: "Timmins/Victor M. Power",
    trailer: "CYTS",
    like: 78,
    score: "41-163-2652",
    total_episode: 4,
    list_category: [{}, {}, {}],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis:
      "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTDMVVWCDXEC6TCRXVJC",
  },
  {
    _id: 64,
    name: "Salamanca Airport",
    trailer: "LESA",
    like: 79,
    score: "83-002-3256",
    total_episode: 81,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}, {}],
    synopsis:
      "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTDQ7TB8RJDBMBM0N05F",
  },
  {
    _id: 65,
    name: "Araçatuba Airport",
    trailer: "SBAU",
    like: 47,
    score: "88-572-8160",
    total_episode: 41,
    list_category: [{}],
    list_episode: [{}, {}, {}],
    synopsis:
      "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTDT5V7AGQN1NZ62ESH0",
  },
  {
    _id: 66,
    name: "Jim Kelly Field",
    trailer: "KLXN",
    like: 46,
    score: "36-068-1366",
    total_episode: 74,
    list_category: [{}],
    list_episode: [],
    synopsis:
      "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTDWR10WEW1GCESMECXG",
  },
  {
    _id: 67,
    name: "Monte Dourado Airport",
    trailer: "SBMD",
    like: 42,
    score: "58-786-9116",
    total_episode: 88,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [],
    synopsis:
      "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTE0Q3BFE7K6R66FM5ZK",
  },
  {
    _id: 68,
    name: "Lannion-Côte de Granit Airport",
    trailer: "LFRO",
    like: 2,
    score: "51-290-1009",
    total_episode: 81,
    list_category: [],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTE219ZXY7HFNQGCD4E4",
  },
  {
    _id: 69,
    name: "Mersa Matruh Airport",
    trailer: "HEMM",
    like: 7,
    score: "25-147-4120",
    total_episode: 48,
    list_category: [{}, {}],
    list_episode: [],
    synopsis:
      "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTE64JNRZ51ABB7D3V85",
  },
  {
    _id: 70,
    name: "Simón Bolívar International Airport",
    trailer: "SKSM",
    like: 43,
    score: "27-302-0038",
    total_episode: 54,
    list_category: [{}],
    list_episode: [{}, {}],
    synopsis:
      "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTE9FTDYAP5NDRSYRBXX",
  },
  {
    _id: 71,
    name: "Youngstown Warren Regional Airport",
    trailer: "KYNG",
    like: 30,
    score: "10-313-6746",
    total_episode: 87,
    list_category: [],
    list_episode: [{}],
    synopsis:
      "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTEDB3MS5VAPCCBH4TZP",
  },
  {
    _id: 72,
    name: "Bahrain International Airport",
    trailer: "OBBI",
    like: 28,
    score: "58-056-5133",
    total_episode: 33,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}, {}],
    synopsis:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTEGZ77EQ9115HS2AKN5",
  },
  {
    _id: 73,
    name: "Sanggata/Sangkimah Airport",
    trailer: "WALA",
    like: 21,
    score: "09-544-3678",
    total_episode: 92,
    list_category: [{}, {}, {}],
    list_episode: [{}],
    synopsis:
      "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTEMFSMSET1C2MKDD0S9",
  },
  {
    _id: 74,
    name: "Senador Nilo Coelho Airport",
    trailer: "SBPL",
    like: 27,
    score: "96-878-6123",
    total_episode: 13,
    list_category: [],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTERJMTS48Y9BKX2J9BN",
  },
  {
    _id: 75,
    name: "Corpus Christi International Airport",
    trailer: "KCRP",
    like: 45,
    score: "76-331-5028",
    total_episode: 33,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [],
    synopsis:
      "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTEW435CH19TG3EYP8K0",
  },
  {
    _id: 76,
    name: "Debre Tabor Airport",
    trailer: "HADT",
    like: 22,
    score: "74-949-1090",
    total_episode: 22,
    list_category: [{}, {}, {}, {}],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis:
      "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTF0240HXTA83HR85N6M",
  },
  {
    _id: 77,
    name: "Tanda Tula Airport",
    trailer: "FATD",
    like: 41,
    score: "65-149-2505",
    total_episode: 27,
    list_category: [{}, {}],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis:
      "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTF4NTXWA3TMY5C5D6CQ",
  },
  {
    _id: 78,
    name: "Kebar Airport",
    trailer: "WASE",
    like: 19,
    score: "33-520-4890",
    total_episode: 75,
    list_category: [{}, {}, {}],
    list_episode: [{}, {}, {}],
    synopsis:
      "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTF8J3NXF8KPRSNB5AE2",
  },
  {
    _id: 79,
    name: "RAF Northolt",
    trailer: "EGWU",
    like: 12,
    score: "99-879-0195",
    total_episode: 77,
    list_category: [{}, {}],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis:
      "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTFC359BM9ZSZW1QJCAR",
  },
  {
    _id: 80,
    name: "Mac Dill Air Force Base",
    trailer: "KMCF",
    like: 16,
    score: "88-174-4852",
    total_episode: 77,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [],
    synopsis:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTFJCRZFX49RAZAFG0SJ",
  },
  {
    _id: 81,
    name: "Jyvaskyla Airport",
    trailer: "EFJY",
    like: 29,
    score: "70-382-7487",
    total_episode: 71,
    list_category: [{}],
    list_episode: [{}],
    synopsis:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTFPQJ04VQXKWM9D3GPH",
  },
  {
    _id: 82,
    name: "Sandringham Airport",
    trailer: null,
    like: 29,
    score: "86-090-1430",
    total_episode: 23,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis:
      "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTFT84MX55PSPWWSS2SW",
  },
  {
    _id: 83,
    name: "Stanthorpe Airport",
    trailer: "YSPE",
    like: 22,
    score: "46-317-8602",
    total_episode: 41,
    list_category: [],
    list_episode: [],
    synopsis:
      "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTFXEGG8TSAGBTMJPC6V",
  },
  {
    _id: 84,
    name: "Leeward Point Field",
    trailer: "MUGM",
    like: 92,
    score: "00-568-3304",
    total_episode: 73,
    list_category: [{}],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTG1TECJKP67XCNRJ0CW",
  },
  {
    _id: 85,
    name: "Mapua(Mabua) Airport",
    trailer: "AYMZ",
    like: 9,
    score: "41-571-3951",
    total_episode: 69,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}, {}],
    synopsis:
      "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTG62RPJFW9CHKWMGYBT",
  },
  {
    _id: 86,
    name: "Hearst René Fontaine Municipal Airport",
    trailer: "CYHF",
    like: 92,
    score: "06-962-2240",
    total_episode: 42,
    list_category: [],
    list_episode: [],
    synopsis:
      "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTGC169XV6ZEH8S3K07V",
  },
  {
    _id: 87,
    name: "Dr Augusto Roberto Fuster International Airport",
    trailer: "SGPJ",
    like: 74,
    score: "07-351-2491",
    total_episode: 81,
    list_category: [],
    list_episode: [{}],
    synopsis:
      "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTGGWT39QWEHE8DG7EGK",
  },
  {
    _id: 88,
    name: "Excursion Inlet Seaplane Base",
    trailer: null,
    like: 56,
    score: "06-073-7793",
    total_episode: 17,
    list_category: [{}],
    list_episode: [{}, {}, {}, {}],
    synopsis:
      "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTGNCF0VCNC5P9ARQ8P7",
  },
  {
    _id: 89,
    name: "Ürümqi Diwopu International Airport",
    trailer: "ZWWW",
    like: 74,
    score: "55-180-7190",
    total_episode: 59,
    list_category: [{}, {}, {}],
    list_episode: [],
    synopsis:
      "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTGSQ3XS8GDDKBZ6HS0A",
  },
  {
    _id: 90,
    name: "Pensacola Naval Air Station/Forrest Sherman Field",
    trailer: "KNPA",
    like: 81,
    score: "75-852-7026",
    total_episode: 29,
    list_category: [{}, {}, {}],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTGW6ZM8F04DB9824QFZ",
  },
  {
    _id: 91,
    name: "Wotho Island Airport",
    trailer: null,
    like: 57,
    score: "30-675-7624",
    total_episode: 26,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis:
      "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTH1392YFBFYGP3ZWPRS",
  },
  {
    _id: 92,
    name: "Tulcea Airport",
    trailer: "LRTC",
    like: 5,
    score: "96-272-1812",
    total_episode: 72,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTH5APN5GR30BSFGPQW8",
  },
  {
    _id: 93,
    name: "Şanlıurfa GAP Airport",
    trailer: "LTCS",
    like: 56,
    score: "22-796-4554",
    total_episode: 5,
    list_category: [{}, {}, {}, {}],
    list_episode: [{}, {}, {}, {}, {}],
    synopsis:
      "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTHAQZ4TSVGTRT81Q8HW",
  },
  {
    _id: 94,
    name: "San Pedro Airport",
    trailer: "DISP",
    like: 58,
    score: "04-125-7503",
    total_episode: 7,
    list_category: [{}, {}, {}],
    list_episode: [{}, {}, {}],
    synopsis:
      "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTHF3M1CM51PZJ2KAV1Z",
  },
  {
    _id: 95,
    name: "Moosonee Airport",
    trailer: "CYMO",
    like: 42,
    score: "03-848-3135",
    total_episode: 45,
    list_category: [{}, {}, {}],
    list_episode: [{}, {}, {}],
    synopsis:
      "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTHK6WN0Q98RNC60NDM7",
  },
  {
    _id: 96,
    name: "Toccoa Airport - R.G. Letourneau Field",
    trailer: "KTOC",
    like: 11,
    score: "67-251-3401",
    total_episode: 79,
    list_category: [{}, {}, {}],
    list_episode: [{}, {}, {}, {}],
    synopsis: "Fusce consequat. Nulla nisl. Nunc nisl.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTHRNX6MF17VE6SGMP09",
  },
  {
    _id: 97,
    name: "Kuujjuarapik Airport",
    trailer: "CYGW",
    like: 89,
    score: "27-200-7766",
    total_episode: 77,
    list_category: [{}, {}, {}, {}, {}],
    list_episode: [{}],
    synopsis:
      "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTHXNVARBFY8M75C7R2P",
  },
  {
    _id: 98,
    name: "Tadoule Lake Airport",
    trailer: "CYBQ",
    like: 35,
    score: "32-747-3531",
    total_episode: 91,
    list_category: [{}, {}, {}, {}],
    list_episode: [],
    synopsis:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTJ25SVBHNM7122SBQTA",
  },
  {
    _id: 99,
    name: "Buchanan Airport",
    trailer: "GLBU",
    like: 57,
    score: "90-163-7552",
    total_episode: 78,
    list_category: [{}],
    list_episode: [{}, {}, {}],
    synopsis:
      "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTJ7KY0X0WYFB9V5XG0K",
  },
  {
    _id: 100,
    name: "Paruma Airport",
    trailer: "SYPR",
    like: 75,
    score: "33-314-5411",
    total_episode: 33,
    list_category: [{}, {}, {}],
    list_episode: [],
    synopsis:
      "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    _id_collection: "01GWCBTTJBA47AHVH09ZY5QVBF",
  },
];
