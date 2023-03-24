const getFilm = async (_limit, _page) => {
  //previousEndItem: id of object
  try {
    if (!_limit || !_page) {
      return { data: DATA };
    } else {
      const startIndex = (Number(_page) - 1) * _limit;
      const endIndex = Number(_page) * Number(_limit);
      const totalPage = Math.ceil(DATA.length / Number(_limit));
      const result = {};
      result.totalPage = totalPage;
      if (endIndex < DATA.length) {
        result.next = { page: Number(_page) + 1, limit: _limit };
      }

      if (startIndex > 0) {
        result.previous = { page: Number(_page) - 1, limit: _limit };
      }

      result.data = DATA.slice(startIndex, endIndex);
      return result;
    }
  } catch (error) {
    console.log("getFilm: " + error);
  }
};

const addFilm = async (
  filmName,
  trailerID,
  totalEpisode,
  categories,
  description,
  imageList
) => {
  try {
    const newObject = {
      _id: DATA.length + 1,
      name: filmName,
      categories: categories ? categories : [],
      trailer: trailerID,
      episode: [{}],
      amount_episode: 0,
      totalEpisode: totalEpisode,
      thumbnail: imageList.thumbnail[0].path,
      background_medium: imageList.backgroundMedium[0].path,
      description: description,
      hearts: 0,
    };
    console.log("NEW OBJECT: " + newObject);
    DATA.push(newObject);
    return newObject;
  } catch (error) {
    console.log("addFilm: " + error);
    return null;
  }
};

const getFilmById = async (_id) => {
  try {
    const film = DATA.find((data) => data._id.toString() === _id.toString());
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
  totalEpisode,
  categories,
  description,
  imageList = {}
) => {
  try {
    const film = DATA.find((film) => film._id.toString() === _id.toString());
    console.log("FILM ITEM MUST UPDATE>>>>>>>>>: " + film._id);

    if (film) {
      const index = DATA.indexOf(film);
      console.log("FILM INDEX MUST UPDATE>>>>>>>>>: " + index);

      const newFilm = {
        _id: DATA[index]._id,
        name: filmName ? filmName : DATA[index]._id,
        categories: categories ? categories : DATA[index].categories,
        trailer: trailerID ? trailerID : DATA[index].trailer,
        episode: DATA[index].episode,
        amount_episode: DATA[index].episode,
        totalEpisode: totalEpisode ? totalEpisode : DATA[index].totalEpisode,
        description: description ? description : DATA[index].description,
        hearts: 0,
        thumbnail:
          JSON.stringify(imageList) !== "{}" && imageList.thumbnail[0].path
            ? imageList.thumbnail[0].path
            : DATA[index].thumbnail,
        background_medium:
          JSON.stringify(imageList) !== "{}" &&
          imageList.backgroundMedium[0].path
            ? imageList.backgroundMedium[0].path
            : DATA[index].background_medium,
      };

      DATA.splice(Number(index), 1, newFilm);
      console.log("UPDATE SUCCESS=>>>>>>>>>>>>>>>>>>>>");
      return newFilm;
    } else {
      return null;
    }
  } catch (error) {
    console.log("updateFilmById: " + error);
  }
};

module.exports = { getFilm, addFilm, getFilmById, updateFilmById };

const DATA = [
  {
    _id: 1,
    name: "Cygnus atratus",
    categories: [{}, {}, {}, {}, {}],
    trailer: "33261-609",
    episode: [{}],
    amount_episode: 4,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    hearts: 12,
  },
  {
    _id: 2,
    name: "Varanus komodensis",
    categories: [
      {
        _id: 1,
        name: "Prefabricated Aluminum Metal Canopies",
      },
      {
        _id: 2,
        name: "Termite Control",
      },
      {
        _id: 3,
        name: "Drywall & Acoustical (MOB)",
      },
    ],
    trailer: "55312-182",
    episode: [{}, {}, {}, {}],
    amount_episode: 21,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    hearts: 63,
  },
  {
    _id: 3,
    name: "Varanus salvator",
    categories: [{}, {}, {}],
    trailer: "13537-111",
    episode: [],
    totalEpisode: 10,
    amount_episode: 32,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description: "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
    hearts: 91,
  },
  {
    _id: 4,
    name: "Leptoptilos crumeniferus",
    categories: [{}, {}, {}],
    trailer: "0904-2056",
    episode: [],
    amount_episode: 16,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    hearts: 98,
  },
  {
    _id: 5,
    name: "Varanus komodensis",
    categories: [{}, {}, {}],
    trailer: "61715-031",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 75,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    hearts: 86,
  },
  {
    _id: 6,
    name: "Seiurus aurocapillus",
    categories: [{}, {}, {}, {}, {}],
    trailer: "49614-170",
    episode: [{}, {}, {}, {}],
    amount_episode: 80,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    hearts: 59,
  },
  {
    _id: 7,
    name: "Agkistrodon piscivorus",
    categories: [{}, {}, {}, {}, {}],
    trailer: "49288-0239",
    episode: [{}],
    amount_episode: 83,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
    hearts: 64,
  },
  {
    _id: 8,
    name: "Geochelone elegans",
    categories: [{}, {}],
    trailer: "59779-854",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 9,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    hearts: 68,
  },
  {
    _id: 9,
    name: "Macaca nemestrina",
    categories: [],
    trailer: "49349-954",
    episode: [{}],
    amount_episode: 28,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
    hearts: 15,
  },
  {
    _id: 10,
    name: "Trichosurus vulpecula",
    categories: [],
    trailer: "11523-7221",
    episode: [{}, {}],
    amount_episode: 34,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    hearts: 1,
  },
  {
    _id: 11,
    name: "Columba palumbus",
    categories: [{}, {}, {}],
    trailer: "17089-068",
    episode: [{}, {}],
    amount_episode: 99,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
    hearts: 24,
  },
  {
    _id: 12,
    name: "Geochelone elegans",
    categories: [{}],
    trailer: "61703-408",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 19,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    hearts: 18,
  },
  {
    _id: 13,
    name: "Amphibolurus barbatus",
    categories: [{}, {}, {}, {}, {}],
    trailer: "0172-3926",
    episode: [{}, {}, {}],
    amount_episode: 80,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    hearts: 30,
  },
  {
    _id: 14,
    name: "Antidorcas marsupialis",
    categories: [{}],
    trailer: "64679-947",
    episode: [{}],
    amount_episode: 66,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.",
    hearts: 33,
  },
  {
    _id: 15,
    name: "Pseudocheirus peregrinus",
    categories: [{}, {}, {}, {}, {}],
    trailer: "54340-799",
    episode: [],
    amount_episode: 70,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo.",
    hearts: 66,
  },
  {
    _id: 16,
    name: "Crotalus cerastes",
    categories: [],
    trailer: "0363-0491",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 45,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    hearts: 78,
  },
  {
    _id: 17,
    name: "Nannopterum harrisi",
    categories: [{}],
    trailer: "44183-508",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 66,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
    hearts: 36,
  },
  {
    _id: 18,
    name: "Antechinus flavipes",
    categories: [],
    trailer: "55111-167",
    episode: [{}, {}, {}, {}],
    amount_episode: 48,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    hearts: 48,
  },
  {
    _id: 19,
    name: "Cygnus buccinator",
    categories: [{}, {}],
    trailer: "54868-5834",
    episode: [{}, {}, {}],
    amount_episode: 10,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    hearts: 52,
  },
  {
    _id: 20,
    name: "Mabuya spilogaster",
    categories: [{}, {}, {}, {}, {}],
    trailer: "21695-586",
    episode: [{}, {}, {}],
    amount_episode: 23,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
    hearts: 3,
  },
  {
    _id: 21,
    name: "Sciurus vulgaris",
    categories: [{}],
    trailer: "21130-660",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 70,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    hearts: 82,
  },
  {
    _id: 22,
    name: "Melursus ursinus",
    categories: [{}, {}, {}, {}, {}],
    trailer: "49349-885",
    episode: [{}, {}, {}],
    amount_episode: 52,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    hearts: 87,
  },
  {
    _id: 23,
    name: "Haliaetus vocifer",
    categories: [{}, {}, {}],
    trailer: "0904-6191",
    episode: [{}, {}, {}],
    amount_episode: 10,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    hearts: 65,
  },
  {
    _id: 24,
    name: "Felis silvestris lybica",
    categories: [{}, {}, {}],
    trailer: "15127-288",
    episode: [],
    amount_episode: 24,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.",
    hearts: 68,
  },
  {
    _id: 25,
    name: "Junonia genoveua",
    categories: [{}],
    trailer: "60760-344",
    episode: [{}, {}, {}, {}],
    amount_episode: 75,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    hearts: 22,
  },
  {
    _id: 26,
    name: "Sceloporus magister",
    categories: [{}, {}, {}],
    trailer: "43547-273",
    episode: [{}, {}, {}, {}],
    amount_episode: 53,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    hearts: 77,
  },
  {
    _id: 27,
    name: "Sceloporus magister",
    categories: [{}, {}, {}, {}, {}],
    trailer: "60429-041",
    episode: [],
    amount_episode: 61,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    hearts: 29,
  },
  {
    _id: 28,
    name: "Cervus duvauceli",
    categories: [{}, {}],
    trailer: "68788-9555",
    episode: [{}, {}, {}],
    amount_episode: 5,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
    hearts: 95,
  },
  {
    _id: 29,
    name: "Corvus albicollis",
    categories: [{}, {}],
    trailer: "68016-144",
    episode: [{}, {}],
    amount_episode: 15,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
    hearts: 93,
  },
  {
    _id: 30,
    name: "Streptopelia senegalensis",
    categories: [{}],
    trailer: "10096-0300",
    episode: [],
    amount_episode: 75,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
    hearts: 33,
  },
  {
    _id: 31,
    name: "Platalea leucordia",
    categories: [],
    trailer: "49288-0458",
    episode: [{}, {}, {}],
    amount_episode: 88,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    hearts: 100,
  },
  {
    _id: 32,
    name: "Trichosurus vulpecula",
    categories: [{}],
    trailer: "0378-6895",
    episode: [{}, {}, {}],
    amount_episode: 71,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    hearts: 22,
  },
  {
    _id: 33,
    name: "unavailable",
    categories: [],
    trailer: "47682-184",
    episode: [],
    totalEpisode: 10,
    amount_episode: 79,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description: "Phasellus in felis. Donec semper sapien a libero. Nam dui.",
    hearts: 27,
  },
  {
    _id: 34,
    name: "Haliaetus leucogaster",
    categories: [{}, {}],
    trailer: "60429-096",
    episode: [],
    amount_episode: 43,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    hearts: 3,
  },
  {
    _id: 35,
    name: "Pterocles gutturalis",
    categories: [],
    trailer: "15499-1234",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 15,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    hearts: 74,
  },
  {
    _id: 36,
    name: "Bradypus tridactylus",
    categories: [{}],
    trailer: "57664-361",
    episode: [{}, {}, {}],
    amount_episode: 56,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
    hearts: 54,
  },
  {
    _id: 37,
    name: "Chelodina longicollis",
    categories: [{}, {}, {}, {}],
    trailer: "0456-2101",
    episode: [{}, {}, {}],
    amount_episode: 45,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    hearts: 84,
  },
  {
    _id: 38,
    name: "Ara chloroptera",
    categories: [],
    trailer: "54575-101",
    episode: [{}, {}, {}, {}],
    amount_episode: 97,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    hearts: 59,
  },
  {
    _id: 39,
    name: "Leptoptilos crumeniferus",
    categories: [],
    trailer: "59779-082",
    episode: [{}, {}, {}, {}],
    amount_episode: 98,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    hearts: 6,
  },
  {
    _id: 40,
    name: "Gyps fulvus",
    categories: [{}],
    trailer: "0456-0461",
    episode: [{}],
    amount_episode: 66,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    hearts: 22,
  },
  {
    _id: 41,
    name: "Mazama gouazoubira",
    categories: [{}, {}, {}, {}],
    trailer: "16853-1307",
    episode: [{}, {}],
    amount_episode: 27,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    hearts: 60,
  },
  {
    _id: 42,
    name: "Gekko gecko",
    categories: [],
    trailer: "49288-0465",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 84,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    hearts: 83,
  },
  {
    _id: 43,
    name: "Panthera pardus",
    categories: [{}, {}, {}, {}],
    trailer: "58118-0155",
    episode: [{}, {}, {}, {}],
    amount_episode: 50,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl.",
    hearts: 4,
  },
  {
    _id: 44,
    name: "Ctenophorus ornatus",
    categories: [{}, {}],
    trailer: "55316-949",
    episode: [{}, {}, {}],
    amount_episode: 25,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.",
    hearts: 70,
  },
  {
    _id: 45,
    name: "Paraxerus cepapi",
    categories: [{}, {}],
    trailer: "50114-1165",
    episode: [{}],
    amount_episode: 92,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
    hearts: 30,
  },
  {
    _id: 46,
    name: "unavailable",
    categories: [{}, {}, {}, {}],
    trailer: "0113-0310",
    episode: [{}, {}],
    amount_episode: 99,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    hearts: 1,
  },
  {
    _id: 47,
    name: "Gyps fulvus",
    categories: [{}],
    trailer: "21695-758",
    episode: [{}, {}, {}],
    amount_episode: 29,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo.",
    hearts: 18,
  },
  {
    _id: 48,
    name: "Genetta genetta",
    categories: [],
    trailer: "59752-0124",
    episode: [{}, {}, {}, {}, {}],
    totalEpisode: 10,
    amount_episode: 94,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description: "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
    hearts: 93,
  },
  {
    _id: 49,
    name: "Tiliqua scincoides",
    categories: [{}],
    trailer: "58411-231",
    episode: [],
    amount_episode: 30,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
    hearts: 45,
  },
  {
    _id: 50,
    name: "Damaliscus dorcas",
    categories: [],
    trailer: "54868-2972",
    episode: [{}, {}, {}],
    amount_episode: 27,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    hearts: 5,
  },
  {
    _id: 51,
    name: "Crotalus triseriatus",
    categories: [{}],
    trailer: "24208-478",
    episode: [{}, {}, {}],
    amount_episode: 63,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    hearts: 54,
  },
  {
    _id: 52,
    name: "Phasianus colchicus",
    categories: [{}],
    trailer: "63629-1256",
    episode: [{}, {}, {}, {}],
    amount_episode: 98,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
    hearts: 36,
  },
  {
    _id: 53,
    name: "Cygnus atratus",
    categories: [{}, {}],
    trailer: "13925-163",
    episode: [],
    amount_episode: 16,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
    hearts: 26,
  },
  {
    _id: 54,
    name: "Spheniscus mendiculus",
    categories: [{}, {}, {}, {}, {}],
    trailer: "63739-480",
    episode: [{}, {}, {}, {}],
    amount_episode: 58,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    hearts: 65,
  },
  {
    _id: 55,
    name: "Ovibos moschatus",
    categories: [{}, {}, {}],
    trailer: "0603-5927",
    episode: [{}, {}, {}],
    amount_episode: 49,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
    hearts: 12,
  },
  {
    _id: 56,
    name: "Cynictis penicillata",
    categories: [{}, {}],
    trailer: "49781-083",
    episode: [{}, {}],
    amount_episode: 22,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    hearts: 50,
  },
  {
    _id: 57,
    name: "Acridotheres tristis",
    categories: [{}, {}],
    trailer: "57337-060",
    episode: [{}, {}, {}],
    amount_episode: 7,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    hearts: 19,
  },
  {
    _id: 58,
    name: "Myrmecophaga tridactyla",
    categories: [{}, {}, {}, {}, {}],
    trailer: "10544-251",
    episode: [{}],
    amount_episode: 38,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    hearts: 55,
  },
  {
    _id: 59,
    name: "Meles meles",
    categories: [{}, {}, {}],
    trailer: "47335-289",
    episode: [],
    amount_episode: 70,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    hearts: 45,
  },
  {
    _id: 60,
    name: "Marmota monax",
    categories: [{}, {}, {}],
    trailer: "41520-419",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 44,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    hearts: 85,
  },
  {
    _id: 61,
    name: "Haliaeetus leucoryphus",
    categories: [],
    trailer: "43742-0019",
    episode: [{}, {}, {}],
    amount_episode: 57,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    hearts: 88,
  },
  {
    _id: 62,
    name: "Panthera pardus",
    categories: [{}],
    trailer: "60505-0025",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 64,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    hearts: 74,
  },
  {
    _id: 63,
    name: "Macropus agilis",
    categories: [{}],
    trailer: "59762-3740",
    episode: [{}, {}],
    amount_episode: 5,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.",
    hearts: 15,
  },
  {
    _id: 64,
    name: "Felis concolor",
    categories: [{}, {}],
    trailer: "0781-2164",
    episode: [{}, {}],
    amount_episode: 70,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    hearts: 39,
  },
  {
    _id: 65,
    name: "Herpestes javanicus",
    categories: [{}],
    trailer: "54868-4146",
    episode: [{}, {}, {}, {}],
    amount_episode: 19,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.",
    hearts: 79,
  },
  {
    _id: 66,
    name: "Geochelone radiata",
    categories: [{}, {}, {}, {}, {}],
    trailer: "36800-523",
    episode: [{}, {}, {}, {}],
    amount_episode: 64,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
    hearts: 50,
  },
  {
    _id: 67,
    name: "Naja nivea",
    categories: [{}],
    trailer: "0527-1311",
    episode: [{}, {}],
    amount_episode: 90,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
    hearts: 55,
  },
  {
    _id: 68,
    name: "Bettongia penicillata",
    categories: [{}, {}],
    trailer: "11523-7343",
    episode: [{}, {}, {}],
    amount_episode: 42,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
    hearts: 28,
  },
  {
    _id: 69,
    name: "Tringa glareola",
    categories: [{}, {}, {}],
    trailer: "10345-036",
    episode: [{}, {}, {}, {}],
    amount_episode: 5,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
    hearts: 62,
  },
  {
    _id: 70,
    name: "Theropithecus gelada",
    categories: [{}, {}],
    trailer: "15127-979",
    episode: [{}, {}, {}],
    amount_episode: 88,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
    hearts: 12,
  },
  {
    _id: 71,
    name: "Macaca fuscata",
    categories: [{}, {}, {}, {}, {}],
    trailer: "75920-0464",
    episode: [{}, {}, {}, {}],
    totalEpisode: 10,
    amount_episode: 58,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description: "In congue. Etiam justo. Etiam pretium iaculis justo.",
    hearts: 7,
  },
  {
    _id: 72,
    name: "Rangifer tarandus",
    categories: [{}, {}, {}, {}],
    trailer: "63629-4838",
    episode: [{}],
    amount_episode: 77,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    hearts: 67,
  },
  {
    _id: 73,
    name: "Agkistrodon piscivorus",
    categories: [{}, {}, {}, {}, {}],
    trailer: "59667-0058",
    episode: [],
    amount_episode: 56,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    hearts: 13,
  },
  {
    _id: 74,
    name: "Sitta canadensis",
    categories: [{}, {}, {}, {}, {}],
    trailer: "64117-888",
    episode: [{}],
    amount_episode: 39,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    hearts: 36,
  },
  {
    _id: 75,
    name: "Corvus brachyrhynchos",
    categories: [{}, {}],
    trailer: "36987-2987",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 82,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    hearts: 10,
  },
  {
    _id: 76,
    name: "Tapirus terrestris",
    categories: [{}, {}, {}, {}, {}],
    trailer: "16571-412",
    episode: [{}, {}, {}],
    amount_episode: 63,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    hearts: 72,
  },
  {
    _id: 77,
    name: "Nycticorax nycticorax",
    categories: [{}],
    trailer: "0075-0622",
    episode: [{}, {}, {}, {}],
    amount_episode: 89,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
    hearts: 19,
  },
  {
    _id: 78,
    name: "Felis serval",
    categories: [{}, {}, {}, {}, {}],
    trailer: "58411-202",
    episode: [{}, {}, {}],
    amount_episode: 35,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    hearts: 86,
  },
  {
    _id: 79,
    name: "Tamandua tetradactyla",
    categories: [{}, {}, {}, {}],
    trailer: "37808-112",
    episode: [{}, {}],
    amount_episode: 43,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
    hearts: 97,
  },
  {
    _id: 80,
    name: "Varanus komodensis",
    categories: [],
    trailer: "42806-502",
    episode: [{}, {}],
    amount_episode: 76,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
    hearts: 26,
  },
  {
    _id: 81,
    name: "Aegypius tracheliotus",
    categories: [{}],
    trailer: "36000-045",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 21,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    hearts: 65,
  },
  {
    _id: 82,
    name: "Mustela nigripes",
    categories: [{}, {}],
    trailer: "65954-047",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 43,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    hearts: 55,
  },
  {
    _id: 83,
    name: "Dasyurus viverrinus",
    categories: [{}, {}],
    trailer: "53808-0243",
    episode: [{}, {}, {}, {}],
    amount_episode: 68,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
    hearts: 67,
  },
  {
    _id: 84,
    name: "Castor canadensis",
    categories: [{}, {}, {}, {}, {}],
    trailer: "36987-1799",
    episode: [],
    amount_episode: 75,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    hearts: 37,
  },
  {
    _id: 85,
    name: "Agouti paca",
    categories: [],
    trailer: "68828-052",
    episode: [],
    amount_episode: 44,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    hearts: 1,
  },
  {
    _id: 86,
    name: "Lamprotornis chalybaeus",
    categories: [{}, {}],
    trailer: "47682-201",
    episode: [{}, {}],
    amount_episode: 83,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    hearts: 22,
  },
  {
    _id: 87,
    name: "Potamochoerus porcus",
    categories: [{}, {}, {}],
    trailer: "54868-5260",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 78,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
    hearts: 6,
  },
  {
    _id: 88,
    name: "Pseudalopex gymnocercus",
    categories: [{}, {}, {}, {}, {}],
    trailer: "68151-3971",
    episode: [{}],
    amount_episode: 23,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
    hearts: 56,
  },
  {
    _id: 89,
    name: "Calyptorhynchus magnificus",
    categories: [{}],
    trailer: "57520-0444",
    episode: [{}, {}, {}, {}],
    amount_episode: 49,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
    hearts: 78,
  },
  {
    _id: 90,
    name: "Tiliqua scincoides",
    categories: [{}, {}, {}, {}, {}],
    trailer: "68828-136",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 39,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    hearts: 12,
  },
  {
    _id: 91,
    name: "Ciconia ciconia",
    categories: [],
    trailer: "58232-0218",
    episode: [{}, {}, {}],
    amount_episode: 54,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    hearts: 71,
  },
  {
    _id: 92,
    name: "Falco mexicanus",
    categories: [{}, {}, {}, {}],
    trailer: "0168-0216",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 32,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    hearts: 93,
  },
  {
    _id: 93,
    name: "Uraeginthus angolensis",
    categories: [{}, {}],
    trailer: "64141-112",
    episode: [{}],
    amount_episode: 35,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
    hearts: 12,
  },
  {
    _id: 94,
    name: "Aegypius tracheliotus",
    categories: [{}],
    trailer: "0093-5353",
    episode: [{}],
    amount_episode: 22,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    hearts: 82,
  },
  {
    _id: 95,
    name: "Bison bison",
    categories: [{}, {}, {}, {}, {}],
    trailer: "0363-0578",
    episode: [],
    amount_episode: 14,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo.",
    hearts: 68,
  },
  {
    _id: 96,
    name: "Spermophilus parryii",
    categories: [],
    trailer: "16110-035",
    episode: [{}, {}, {}],
    amount_episode: 10,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
    hearts: 84,
  },
  {
    _id: 97,
    name: "Pteropus rufus",
    categories: [],
    trailer: "50181-0038",
    episode: [],
    amount_episode: 97,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    hearts: 23,
  },
  {
    _id: 98,
    name: "Varanus salvator",
    categories: [{}, {}, {}, {}],
    trailer: "0228-3482",
    episode: [{}, {}],
    amount_episode: 38,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    hearts: 25,
  },
  {
    _id: 99,
    name: "Equus burchelli",
    categories: [{}, {}],
    trailer: "0085-1194",
    episode: [{}, {}, {}, {}, {}],
    amount_episode: 93,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
    hearts: 1,
  },
  {
    _id: 100,
    name: "Raphicerus campestris",
    categories: [],
    trailer: "42702-103",
    episode: [],
    amount_episode: 46,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    hearts: 50,
  },
  {
    _id: 101,
    name: "Raphicerus campestris",
    categories: [],
    trailer: "42702-103",
    episode: [],
    amount_episode: 46,
    totalEpisode: 10,
    thumbnail:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/23111525/SAO-delay-1-game4v-1661228124-28.jpg",
    background_medium:
      "https://ecdn.game4v.com/g4v-content/uploads/2022/08/03092123/SAO-P-01-game4v-1659493282-24.jpg",
    description:
      "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    hearts: 50,
  },
];
