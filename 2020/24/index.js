const solve1 = (input) => {
  input = input.split("\n").map((line) =>
    line.split("").reduce((acc, cur) => {
      const prevElement = acc[acc.length - 1];

      if (prevElement === "s" || prevElement === "n") {
        acc[acc.length - 1] += cur;
      } else {
        acc.push(cur);
      }

      return acc;
    }, [])
  );

  const tileCoords = input.map((tile) => {
    return tile.reduce(
      (acc, cur) => {
        // console.log("acc", acc);
        // console.log("cur", cur);
        switch (cur) {
          case "ne":
            acc[0] += 0.5;
            acc[1] += 1;
            break;
          case "e":
            acc[0] += 1;
            break;
          case "se":
            acc[0] += 0.5;
            acc[1] -= 1;
            break;
          case "sw":
            acc[0] -= 0.5;
            acc[1] -= 1;
            break;
          case "w":
            acc[0] -= 1;
            break;
          case "nw":
            acc[0] -= 0.5;
            acc[1] += 1;
            break;
        }
        // console.log("acc", acc);
        return acc;
      },
      [0, 0]
    );
  });

  const coordCount = tileCoords.reduce((acc, cur) => {
    const key = cur.join("");
    acc[key] = acc[key] ? acc[key] + 1 : 1;
    return acc;
  }, {});

  const finalCount = Object.values(coordCount).reduce((acc, cur) => {
    if (cur % 2) {
      acc += cur;
    }
    return acc;
  }, 0);

  console.log(finalCount);
};

const solve2 = (input) => {
  // https://www.redblobgames.com/grids/hexagons/#map-storage
  const dirToDelta = {
    nw: { dx: 0, dy: -1 },
    ne: { dx: 1, dy: -1 },
    w: { dx: -1, dy: 0 },
    e: { dx: 1, dy: 0 },
    sw: { dx: -1, dy: 1 },
    se: { dx: 0, dy: 1 },
  };

  const getNeighbours = (x, y) => {
    const result = [];

    for (const direction in dirToDelta) {
      result.push({
        x: x + dirToDelta[direction].dx,
        y: y + dirToDelta[direction].dy,
      });
    }

    return result;
  };

  function coordinatesToId(x, y) {
    return x + "#" + y;
  }

  let x, y;

  let blackTiles = new Set();

  for (const line of input.split("\n")) {
    x = 0;
    y = 0;
    const directions = [...line.matchAll(/e|se|sw|w|nw|ne/g)].map((x) => x[0]);

    for (const direction of directions) {
      x += dirToDelta[direction].dx;
      y += dirToDelta[direction].dy;
    }

    const key = coordinatesToId(x, y);
    if (blackTiles.has(key)) {
      blackTiles.delete(key);
    } else {
      blackTiles.add(key);
    }
  }

  for (let i = 1; i <= 100; i++) {
    newBlackTiles = new Set();

    const keys = blackTiles.keys();
    for (const tile of keys) {
      const [x, y] = tile.split("#").map((x) => parseInt(x));

      const cellsAround = getNeighbours(x, y);
      cellsAround.push({ x, y }); //add the current cell

      for (const cell of cellsAround) {
        const currentId = coordinatesToId(cell.x, cell.y);
        const neighbours = getNeighbours(cell.x, cell.y);
        const totalBlackTiles = neighbours.filter((n) =>
          blackTiles.has(coordinatesToId(n.x, n.y))
        ).length;

        if (blackTiles.has(currentId)) {
          if (totalBlackTiles === 0 || totalBlackTiles > 2) {
            newBlackTiles.delete(currentId);
          } else {
            newBlackTiles.add(currentId);
          }
        } else {
          if (totalBlackTiles === 2) {
            newBlackTiles.add(currentId);
          }
        }
      }
    }

    blackTiles = newBlackTiles;

    console.log(i, blackTiles.size);
  }
};

const inputExample = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`;

const input = `sweswneswswswswwswswswseneswswnwswwne
swwswswswnwswwnwswswswwswswseenwsesw
eeeeseeeneeenesweweeeswee
swswswwneseneswswwnwswneswswwenewne
seesesesenewsenwseseesesesesesenwesee
nwsenwnwnewnewnwenenewnenenwneenenwne
seseswsesenwnwswsenwneswswsesenwseswswsesw
enwnwneswnewneswnwnenenwnesewsenenenwne
swswnwsweseseswswswseweswswswnwseswsesw
wwwweneswswwswwswswwwwswnewnww
wwwnewwswswseswewwsewswwwswwnwne
wswswwnwswwswwseewwweswwnesww
wnwnwsenenwnwnwsenwnw
nwwwsesenwnewsenenweneneeeswwsese
senenwnwwnwsewwewswnwnwewnwnwwnwnw
seswsesenwseswseseeseeseseewswneseww
ewswseneswseswswswnewnwwswswswnwewnw
nwnwnwnenwsesesenwnwwewnwnwwewwe
swswswswswswnwseneswwswsww
swseneweswswseswseeseswswswseswwnww
swseswswswneswswswewwwswwsw
wswwnwnewnwnwwnwswwnesenwnwwwnww
wwnewnewnwswwwwwsewwwswwwswese
wswsesewswswwwwenewwwwwwnwswsw
seeeeneweeesweeeeneeeeeew
swseswneneseeswweswneswsewnwswsewese
eseseeneswsenweswesewenwseneenww
neswnwnwnenwnwenenwwswnwswnenwnenwenw
swewswswswswswwenwswswwswswnewswnesw
eswwnwnwnewsenwwnewwwsweesesene
swneneswnwneneswnwwnenwneneneneeseswwsene
swnwnenenenwnewenwnenweeneswneswnenwswsw
seneewesesesesenwseswsesesesewseseesese
wseswsenwwnesenwnwenwneesewnwwnwwnw
nwnenenwnenwnwnenenwnwneeneesesweneswnwsw
nesenewneneneneneneenenenenenenewe
seneseseseswswseesenwsee
swsweswenwswneswwswswwswswewsweswsw
ewneswewwwnwwsewwswwwwwwwww
wwwneswnwnweseseewnenwewwswww
swneenwnwnwnwwwwnwsenwwwenwswnwnwww
seenwswseseesenwsenwseseseseseseswsese
seeesweeseeneesee
nwnwwsenewnwwnwnwwsenwnewsesenwsenwnw
wswswseswseneeswswswswseswswseswswnw
neeseesesewsesewseeseseeeeeenwse
swnwnwenewnwnwnwnwnwnwnwsenwnwnwnwnwnwe
wwenweswnweenwnwsewswneenewsenenw
nwseeweswseeswnwneseweenesenwenee
nwnwnwnwnwnwnwnwnwnwswsenewesenwnwnwnw
nwwneseneeneneneneneesenwnenene
neneeneeseneneneswneswnwnenenenenewnene
neneeswenwseneene
nesenenweswswswsesenwnesesewswswwsww
wwwsewnwnwwwnwnwneewse
wwwnwnwneswsenwewswswewnewswnwnw
neewwewneneeeseseneeneenewseneee
wswnweswnewswwswsewnenewwe
neneesesenwnwsweene
swnwenenwnwnwseswswneewnwnenwnesewesesw
seseswseswnwswswweseswseweswsesenwsee
swsesesenwwnwenwnwneeswseswseswesesenw
nwnwnwnwnwnwnwnwnwnenwsenwnw
senweeewewsewewnwesenewneswenwsw
nenwnenwwweswsenwseseswswswwnenewswenw
eseeesweenweeesesesewseeeenwe
neswnenenenweeswseeseswewswnwneneene
sewnwwswwwnwnwnenenwswenwwwnwnwnw
wseneseeeseseseseseseee
seeeeeseweseseseseewwsesesesesew
swseswnwswnwnesewsweswswsw
neseneneeneenenewseeenesweenwene
swseswsenewswseseseswseseseswse
nwnwnwwswwswwwnene
nwnwewnweneneenenwwwsenwswneswee
wnwswnwneswnwwnwwnewwenwwwsenwww
swneswneswswneenenenenwenweneneeew
wwswwswswswwswwseswswswswnwswne
swnwseesesesesesesenweseeseseseesewe
eenenwneneneswnenwneeneneeswnenenwneswne
seeseseeswseewnweenwsenwswesesene
wswswswswswseswsewwnwswswnww
eeeweneeswenenewweeeenenesenee
nwwwewswnwwwwewnwsesew
wswsenweenwnwwnwswewswnene
seseesenweswswseseswsesweswwswnwswse
eeneswenenenwswnwnenenesw
seseneswwnwneswswsweswnenwnwsenewswenesw
neneneneneswneneswnenenenwneswnenenenee
neeswnenenenenenenenwnewe
swswswnwseswseswsenwswswswseswsesw
nenwswswswswswswwsenwseswswwswswswswswesw
wseesenwwnwswseseenwseseseswseeswsenese
sewwnenewwwwwwswwwwwnww
wsewseseseneeeseeweeesew
nwnwnwnwenwnwnwnwnwnwnwenwnwnwswsenwswnw
neswwseswseswseswswswseseswnewseswswne
wswnwwnwenwwnwwnwwewwwww
nwnwnwswwwwnwewnewwwnwnw
eweeeseseeeeseee
wswwnwnwnwnwenwnwnwswnwnwwwnenw
nenenwnenenenenenenenesenenenenw
wneneswneseeneenenenenweneeeneene
wewnwenwwenwnwnwnesenwnwwnwnwew
seseswswneseseseseseseseneswsesese
neneneneneenwsewnesenenenenenwnwnewnene
wwwwwnewswseswwsewnwwwwneww
swwswwwwwwesewswwswwwswnene
nwenwnenwneneswnwnenesewnwnenenwnwnwne
seenwswswseseeswswnwenwenwnweesene
senwsewnenwneswwnwnwenwswenwwnwwnenw
newsenwseweesenewnwnwnwwwswnwnwnwsw
eseseseeewnwesewswseenwenwewne
wswneswswswswswswsw
sewswsesesesesesewswwseneseenesw
enenwnwsenwnwwsenwnwnwwwnwnwnwsewnw
senwewswsenenwwseesweweneeseswnew
senenenwnenenwnenwnwnenwenenwnwnwswwe
neeseseeseseeewseeseseee
wswwwnwsewnewswswnewwwse
nwnwnenwwwwswwsewwwewsewswswswesw
esweneeeneeeeeeenwne
swwwnewswnwwswwsenweseeewswswswnw
nwnwnwsesenwnwwwenenesewnwswwnwnwnwsw
nwswnenenenwnwnwenenenwswnweewnwnwne
nwnenwwnwnwewnwnwnwsenwnwsewnwnwsene
eswnwswswswsweswwswwsweswswswswwnwsw
enewnenenenenewneneeswnenwnenwneew
swswseswswneswewswwseswnwwnwneswneswsesw
nwewswseeswsenwwweswneesewenenwe
eswswseswseseswswnewse
nwneneneseneneneseneneneneneswnenenwnene
sesesenwenweeenwnwswwsweeneneenene
nwwnwnwsesenwnwnwnwnwnenenwwneswesenwne
seewnenwwnwnewwsenwswwwwwnwnew
eswneneeneenwneswneneneneswnewsenee
neneswnenwnenwnwnenene
eesweseeeeneeweeeeeenwenw
seseseseneseseseseswswnewnwsesewswswse
nwnwsenwswwnwnesenwenenenwneeswnwnwne
wneswwwwnwnewnwwswswwnwwnwwsene
eswneneswnweneneneneneeneene
nwnwwwsenwswswnwswenenwnew
swswswswwwnwwenwwswswswneswswseswe
ewwnwseseswnewswwneswwswnwswswee
eesewwneeeseneeseseweseeseee
eeweweeeeesenweeeeeeeesw
enwnenwnwnenwnwnwnenwswneswnwnwnwenwnw
nwnwwwswsewwnwnweswnwwnewswnewnwnw
eeneneewseneneeenenweeeweeseese
nwnwswsenewwwsewnwwwneww
newnenenwnwwnweseswsenenesenwnenew
eseseneseeeseseswwnwseeeenwseesese
seswswswnewnwnwewswsenweswseenwswse
swsenenwseswseseswwseneswsewswsenenew
wnenenwnenwnwewnwnenwseneenwnwnewnw
neneneenwwseeenwswseeewseneeewse
swewsesenwneseneeswenwsese
eswseesweeenenenweenenenewnenwne
newnenenenewnenesweneneneneenwnwnenesw
wnwwnwwnwwnwnwsewwnwnwnww
sewwwsewwwwwwnenwenenwwww
eseewnesenwseseseseneswsenwsesesenenww
neswswnewseswseeswswswsewswseseswswswe
seswwnwsweweswnwnesenwswseeenwsesw
nenenenenenenweneewwenesweswenenw
seseneseswsesewnwwseesenwnwsw
nwswnwweswnenwnwnenenenwnwnwswnenwnwnwnw
nwswnwewswswswwewwwswswswwswnewsw
seneseneeeeswswsenwnewnwwenenwwswne
seeseseseenwswsewseswwneswsenewnwswne
wwwwnwwewewswswwwwwwewnw
neeswewwwwwwswwwseenwnewwseew
neneswnwwnenwnwwswwnwnwesese
eeneneeneneneneneneewee
nwwswseneeeenewneeeeneenewsweesw
nweswsweswneswenwsweeneswswwswwnw
swneneneseneeeswnwswnweneneneenwneee
seenwswnwnwswswswswseswswesweswseswsene
swswswneswswnwenwsenesewenwnwsenwswswswe
eeneweeseseweeseeesesenesesese
nwnesenenwnwnenwnenwnewswneenenenenene
wnewnenwswwnwwsenwseseeswnenewewwsw
eeeseneweenenwwweewsweneeee
neneswenwswnwenesweneneeeneneeneeene
eneswweeswesenwnenenenee
nwswweswneesesenenwswswswe
neswseswseneswwneneneeswnwnenenewnenene
swswesesenwsenewseseseseswseeswswswswse
eswnwswswswseswswswswswsw
nwnwnwewnwnwneneenwwsenwnwnwnwwnene
enewswwseseswnenwneenenwnwsesesewnenene
eenwnwwswenwnwnwwenesenwewneswne
seseseseswseneseseneewswsesewsese
neneneneneneswswnewneenwneneewnenenee
ewswwswswwnwnwwwswswswseswwwwse
wnwneswwswswnwwnwweenenwnwewsenwne
sewneseenwseseseneenwswseseesew
enweeneseswswneeneweeswsesweenw
nwnwnwsenwnwnwnenwnwnwwnwnwnwnwsew
nwnenwwnwnwswnwnwwnwnwwwnwenwenww
nwnenenwneswswnwnwnenwnesenwsenenenenenenw
sesenesewnwseseeseew
swnwwnwsenwneswnwneenenwsenesene
seeseswwnewwnwewwwswesenwnewsenw
swsweswswweswwswewswswnwswwneswswsw
seeseswnwweseenesesesenesesenwwseew
swseswswswswsweswswsewswswenwswnesww
nwnwwwnwwnwswnwnwseenwenwsenwnwnenw
nwsewsewnwsesesenweswseseseseeesese
seeneeenwneneneeeenenenee
swnwwnwnwnwnwnwnenwnwnwnwnw
swseeswswseneeseswseeswsesenwwswswswnw
wnewwswsewwwwww
nwseeswnwnweewweswnewswnwweee
swseswsesenesesenwwseswseeswseseseenwse
swswnwwseswneeswwswneseswnew
seseeseneseseweeseesesenenwseswww
nesenwwewsesweesewseswswwswnwne
swnwwneeenwnwnwswswenwnwnenwenwwswnw
senwnwsenwwsenwnwne
swswswnwswwseneeneswwswnewneswnesewswse
wsenenweewwewnwwnwnenwnwnwesenw
nwnwnwnwwnwnwnwnwnwsenwswnwnwnwnwnwsene
neenenwneneseneesweneswwswne
eweeeesenweeeenwseweweeee
wswwweswsewwnewseswwwnewwwnesw
wnwnenwswnwnwnwnwwwnwwnwnw
nwnwewnwswneenenwnenwnwnwnenw
eneeweseeswswesenwnwseeswenwseene
eswnwnwsweeeswwswnwswwswwseenww
weswsesewnwwseeseweseseeeneenenew
nwnwnwnwnwwewnwnwnwwnwnwsenwnw
nwnwnwswnwnwnwnenewnwenwnwne
nwseneewneseneeseseseswsewwsesewsew
swsenweseseeeseswseeeseseewesenwne
wswnwnwwwewswnwwnewsenwnwweww
seesewswnwesenwswswsenwswswseswesw
neesewnwsenwsewnwsweswsenenewneewse
nwnwwwnwnwsewnewwwnwnwwnwnwswenw
neneswswswswsesenwswswswswwswseseswswsw
nweeswswneneeeneneewswneenenenwswne
wseeeweseeeeseneeeeenweeew
nenenewneneneneswneneseneeneeenenewne
nwnwnwenwnwnwnwnwnenwswnw
sewsesesenenesewseseseseneeesesewe
eeneseswseweeeeeeweseeeenwe
nwnwnwnwewnwwswnwnwnwwenwenwnwenw
nwnwnwsewseeseenww
nwenwnenenwswnwenenwneswneswnwnwnwnwnwne
wwswseneswseneweswenwseseswswsweswsw
swwwnweswswwwnesewsw
eneeeeeeswwneneeeee
nwnewwwwwseewswnewwwwwwnww
senwnwnwnwnwnwnwnwwsenenwnwnwnwnwsenwnwnw
seswnwsesewseswseeseseswewnwesenwswse
newneswneneeneenenenenenewne
swwwswswswweeswnwnewseseneseneenesew
wwewwnewswnwwwwnwnwswwsewwse
nenenesenesenewsenenwnwnesenewnwnenenenw
seeeenwesweweeeneneseeneseswsw
nwnwswnwsenewnenwnwnwnwsenwnenwnwnwnwnenw
swneneneneneenesewneeeseswewswnenee
sweewenwneenesenwsweneneeneneswne
sesweseseenwseseseswsenwseneseseseseese
nwsewwenenwseewnwewwsweswewnwse
seswswseseneesewwenwswwswneseeneswswse
sweswsweseswswswsweswswswswswnwswswwnw
newnwseeenwnwenesewwneswswne
nenwnenwwwneenenwnenwnenwswnwneseese
eseenwesesesenwseweseeeeswswnwe
nwnwwnwnwwenwnwnwwnwnwwsw
swwwseswwnwwswswenewwswswwwnwww
wnenwnenenwnwwnenwsenwnwsenwnwnesewsene
swnwwsewswnewwswwwewewwnwwsw
wsweswswneneswseneswswnwswswenwswse
swnwseseenewseswsenw
eesenesweeneesenwswseeseewnweee
eneeeeneeeneneewnesene
seeseneseswwneweseneeeswenwsesenesw
wswseswwswswwwneswneseswneeswwwwwsw
nwesesweewswnwenwnweswnwswsw
nwnwnwnenwnwsenwnesenwnwenwwnwnwwnwnw
swneswenwnwnweneenwnwswnwnenwnwnwnenenwse
nesweswnwswnwneneeneewnwneseneeswnenese
neeenwseneewneswnenwseeeneenenenenew
swnwnwenwnwnweswnwnwnwnwnwnwnenwnwnwnese
nesenewswwneneswnweneenwnenee
swswswswswneswswswswswswswswsw
neneneneeneneewswenenenwewneswenene
weneneseeneneeenenenweeeeneewswe
wwwsenwwsewnwenenenwneswwnewseseesw
newnwnesenesenwneesewnwwnwwnwenenw
seenwnwneeeneeeweenesweeesese
nwnenewnesenwwnwnenwnwnwnwwnwseenwwnwse
ewnenwswneseneeese
wneewseeswneneswsweeeenwnesenwne
swswseswnwsewsewnwswswwswnwswswnesesw
seseseseseeseesesesewsese
nwwswswwswsewwwswsww
swneswseeneswsewswswwswsw
neswwswswnewewnesewwesenesenesww
newwnenwneneseesenenenenenenenweswnw
weswsweswswswwswwneswswswswswswnwwsw
swswswswswneswenwswweswswseswseseswnw
wsewnwsewnwwwsweneww
seeeeeenweesweeseee
sesesesesesesesesewesenwswneneseseswnw
nwnenwnwnwsenwnwnwwnwnweneswwe
wnenwnwsewnwwnewnwsesenwnwsenewnw
seeseneswesewnwe
swwnenwnwenenwseswneswwnesesweeswnwnw
swwswneswswwwswwneseeswwswswswsenwsw
eewwwneeseneeewwewenenewne
swswswwseneeneswwswseswswnewswnewnwsw
newnenenewswenesenenwneneesewneenesw
neeseswnweswswsenwwsenwweesesesesesw
seeseeswenwnweeeeeeeenw
seswswswseswwseenwseseswseseseesesw
wswswswnenwswswseswswseswswseswswnesesww
esesenweeswseeeseenesenwese
eseseenwseseeseseweesewseseesesw
enwnwnwsenwnwswnwnwnwnwnwnwnenwne
esesewneneeseswseewwnweeseeswnwse
wsewwenwswnwwsewwnwwwwswwwew
nwswswswseneswswswneseseeswwwnesenesesw
nwsesenwseeseesesweseseseeseeseeew
enewwwswwewwewwnenwsewwwwse
nwnweneeswewwnwnenwenwwwenenwnw
wwwwwneswswswwwwwewwwswnew
eswseseswnwswsewsw
wsweswwwenwwwsesewweswnwswwnwsw
nwsewwwnwnwsenwnweewwnwwnenewnw`;

// solve1(inputExample);
// solve1(input);
// solve2(inputExample);
solve2(input);
