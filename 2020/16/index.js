const getValueRanges = (rules) => {
  return rules
    .split("\n")
    .map((row) => {
      const values = row.match(/(\d+)-(\d+) or (\d+)-(\d+)/);
      return [
        [+values[1], +values[2]],
        [+values[3], +values[4]],
      ];
    })
    .reduce((acc, cur) => [...acc, ...cur]);
};

const combineRanges = (ranges) =>
  ranges.reduce((acc, cur) => {
    let skip = false;
    acc.forEach((range, i) => {
      if (range[0] < cur[0] && range[1] > cur[0] && range[1] < cur[1]) {
        acc[i][1] = cur[1];
        skip = true;
      } else if (range[0] < cur[1] && range[1] > cur[1] && range[0] > cur[0]) {
        acc[i][0] = cur[0];
        skip = true;
      }
    });

    if (!skip) {
      acc.push(cur);
    }

    return acc;
  }, []);

const getFields = (rules) => {
  return rules.split("\n").map((row) => row.match(/([\sa-z]+):/)[1]);
};

const solve1 = (input) => {
  let [rules, ticket, nearbyTickets] = input.split("\n\n");
  const allRanges = getValueRanges(rules);
  const validRanges = combineRanges(allRanges);
  nearbyTickets = nearbyTickets
    .split("\n")
    .slice(1)
    .map((ticket) => ticket.split(","));

  const invalidValues = nearbyTickets.reduce((acc, cur) => {
    cur.forEach((val) => {
      const valid = validRanges.some((range) => {
        return range[0] <= val && range[1] >= val;
      });

      if (!valid) acc.push(+val);
    });

    return acc;
  }, []);

  console.log(invalidValues.reduce((acc, cur) => acc + cur));
};

const solve2 = (input) => {
  let [rules, ticket, nearbyTickets] = input.split("\n\n");
  const validRanges = getValueRanges(rules);
  const fields = getFields(rules);
  nearbyTickets = nearbyTickets
    .split("\n")
    .slice(1)
    .map((ticket) => ticket.split(","));

  const validTickets = nearbyTickets.reduce((acc, cur) => {
    const isValid = cur.every((val) => {
      return validRanges.some((range) => range[0] <= val && range[1] >= val);
    });
    if (isValid) acc.push(cur);
    return acc;
  }, []);

  const ticketNumsByField = [];
  for (let i = 0; i < validTickets[0].length; i++) {
    ticketNumsByField.push([]);
    validTickets.forEach((ticket) => {
      ticketNumsByField[i].push(ticket[i]);
    });
  }

  const possibleFields = {};
  ticketNumsByField.forEach((fieldValues, i) => {
    for (let j = 0; j < validRanges.length; j += 2) {
      const range1 = validRanges[j];
      const range2 = validRanges[j + 1];

      const isValid = fieldValues.every((val) => {
        return (
          (range1[0] <= val && range1[1] >= val) ||
          (range2[0] <= val && range2[1] >= val)
        );
      });

      if (isValid) {
        possibleFields[i] = [
          ...(possibleFields[i] ? possibleFields[i] : []),
          fields[j / 2],
        ];
      }
    }
  });

  let fieldsToFilter = true;

  while (fieldsToFilter) {
    for (const [_, fieldArr] of Object.entries(possibleFields)) {
      if (fieldArr.length === 1) {
        for (const j in possibleFields) {
          if (possibleFields[j].length === 1) continue;

          const idxToDelete = possibleFields[j].findIndex(
            (field) => field === fieldArr[0]
          );
          if (idxToDelete === -1) continue;

          possibleFields[j].splice(idxToDelete, 1);
        }
      }
    }

    let arraysToProcess = false;
    for (const [_, arr] of Object.entries(possibleFields)) {
      if (arr.length > 1) {
        arraysToProcess = true;
      }
    }

    if (!arraysToProcess) {
      fieldsToFilter = false;
    }
  }

  const translatedTicket = {};
  for (const [i, field] of Object.entries(possibleFields)) {
    console.log(field);
    translatedTicket[field[0]] = +ticket.split("\n")[1].split(",")[i];
  }

  const keys = Object.keys(translatedTicket).filter((key) =>
    key.startsWith("departure")
  );

  const answer = keys.reduce((acc, cur) => {
    acc *= translatedTicket[cur];
    return acc;
  }, 1);
  console.log(answer);
};

const inputExample = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

const inputExample2 = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`;

const input = `departure location: 50-688 or 707-966
departure station: 33-340 or 351-960
departure platform: 42-79 or 105-954
departure track: 46-928 or 943-959
departure date: 42-464 or 482-974
departure time: 25-595 or 614-972
arrival location: 26-483 or 494-962
arrival station: 31-901 or 913-957
arrival platform: 35-721 or 736-958
arrival track: 44-639 or 661-960
class: 45-391 or 416-969
duration: 46-167 or 186-962
price: 42-312 or 335-969
route: 36-369 or 375-971
row: 46-870 or 877-972
seat: 49-836 or 846-961
train: 50-442 or 450-970
type: 37-706 or 715-952
wagon: 45-674 or 687-962
zone: 40-198 or 219-963

your ticket:
151,139,53,71,191,107,61,109,157,131,67,73,59,79,113,167,137,163,149,127

nearby tickets:
311,898,109,901,67,634,127,949,166,106,614,752,899,833,294,505,738,559,909,366
464,616,619,439,796,589,423,62,853,785,772,110,294,63,266,193,418,327,145,881
787,591,543,805,823,129,571,194,862,794,432,108,224,150,368,365,304,307,885,93
506,831,989,379,551,767,111,58,508,77,551,633,110,581,819,220,901,913,850,672
126,192,454,456,167,592,623,900,144,785,948,615,755,527,157,258,160,442,232,995
882,458,247,246,159,66,924,76,553,320,122,227,148,505,785,292,716,621,120,74
291,771,494,307,324,269,262,884,520,250,773,814,741,224,892,389,146,420,426,105
758,306,271,769,379,266,427,231,378,600,506,914,616,572,220,220,853,541,878,305
385,884,583,687,803,440,143,518,282,886,588,626,492,246,152,813,626,290,148,299
495,594,781,671,224,570,362,220,419,777,835,296,774,455,249,407,310,895,586,460
358,454,892,774,531,390,230,276,112,273,56,911,574,737,514,753,73,741,894,416
868,533,763,555,423,482,790,188,854,855,849,686,794,782,847,717,142,274,381,551
251,662,133,877,895,225,915,848,159,781,496,889,907,265,127,135,156,504,669,779
155,780,126,134,799,138,298,363,916,339,389,156,768,451,613,853,73,586,419,355
855,425,305,118,574,881,909,359,144,574,575,715,266,924,745,748,868,72,120,360
819,155,629,536,902,498,623,560,164,949,71,153,311,614,336,830,455,280,542,584
744,136,855,989,166,545,421,618,896,921,224,870,574,668,450,131,133,862,234,513
583,627,889,136,253,773,233,76,425,946,324,285,688,69,237,861,152,585,243,337
69,547,531,517,719,430,556,241,369,515,586,423,299,822,294,764,380,867,90,495
825,244,715,769,133,801,292,252,626,691,541,281,687,439,618,108,435,553,820,832
566,309,190,99,195,380,434,920,294,523,360,789,788,306,238,110,286,792,778,252
880,899,24,257,442,811,758,250,820,666,821,312,76,883,113,833,575,758,893,434
220,677,537,78,384,822,747,146,265,339,589,521,741,292,917,338,554,544,542,270
636,554,920,770,556,813,533,832,587,277,460,225,232,261,743,674,669,629,217,632
500,404,236,631,862,886,274,358,783,764,687,889,895,802,442,220,625,442,458,585
589,747,879,877,417,543,166,926,870,195,362,413,116,794,337,119,788,926,590,574
483,783,866,56,250,570,976,421,452,665,106,435,545,945,809,620,58,511,268,288
870,498,112,280,489,620,141,257,820,417,150,142,663,760,671,111,255,358,147,498
814,337,544,686,592,509,110,626,78,63,248,881,863,552,385,150,457,186,117,663
226,827,379,825,747,260,416,833,563,495,685,237,197,149,674,541,559,266,378,715
505,883,190,516,582,813,463,850,53,877,716,351,687,787,439,886,993,115,638,544
125,585,430,806,416,756,800,627,755,917,259,78,688,802,922,238,235,815,502,708
852,584,368,237,69,336,268,786,429,877,15,451,593,248,913,878,590,687,623,361
616,65,672,373,428,889,243,287,890,761,292,108,436,291,71,262,515,853,273,367
789,770,877,482,545,362,614,107,772,752,532,756,829,789,814,557,2,236,441,632
557,382,810,928,865,408,268,914,269,620,165,440,368,848,136,251,232,51,123,293
626,307,862,788,132,781,466,442,921,441,802,228,816,849,740,389,622,546,637,265
51,463,547,440,740,775,140,790,258,436,455,193,50,926,250,579,707,531,511,121
54,770,821,363,508,355,284,51,748,798,292,564,883,239,277,458,867,270,114,18
584,558,888,566,141,527,161,561,224,906,61,364,235,759,614,637,381,547,584,302
879,139,370,784,877,623,619,637,312,621,898,614,53,277,661,794,788,515,284,308
634,569,483,777,824,109,786,427,721,562,868,536,297,259,422,254,671,109,6,572
115,194,524,462,423,989,278,638,269,543,760,384,265,234,796,672,721,877,748,375
335,489,387,552,300,816,925,310,797,266,79,237,559,146,819,768,264,304,186,287
760,224,128,296,756,72,885,517,787,456,572,131,74,460,831,283,923,634,634,448
880,920,847,75,812,816,455,579,308,549,263,802,389,152,227,761,528,257,874,804
154,232,540,358,252,857,825,552,740,751,762,833,166,584,120,430,109,557,313,422
562,771,756,757,421,740,559,589,634,421,69,807,282,756,290,161,508,848,184,743
882,622,906,459,273,229,808,219,435,761,743,919,435,531,222,364,592,881,544,304
633,163,75,231,340,537,772,521,755,857,542,741,821,305,504,719,455,186,445,883
438,271,812,391,526,774,63,948,806,485,377,295,769,565,267,336,135,948,847,577
589,276,339,850,546,834,423,56,167,757,555,307,387,65,387,883,483,707,251,618
116,116,464,715,75,533,802,360,125,624,159,107,539,389,617,975,541,64,483,296
440,142,573,283,806,62,373,195,105,831,241,793,503,535,948,949,435,419,798,893
901,462,285,422,110,636,425,108,549,874,152,790,625,339,546,230,442,579,73,518
813,355,636,915,632,506,421,234,867,582,452,523,854,574,485,794,188,506,130,879
387,508,849,167,518,509,500,450,361,532,663,713,715,916,128,134,189,809,855,797
854,549,479,219,566,855,588,789,367,189,560,518,553,738,718,518,879,551,635,494
774,945,525,452,191,756,378,381,755,588,917,303,850,263,195,582,261,571,456,935
525,552,878,821,666,137,549,788,114,301,421,75,253,637,924,500,824,996,866,462
835,505,665,765,831,889,383,578,513,232,340,372,835,464,751,820,306,255,381,898
571,312,770,259,775,881,312,790,143,266,752,235,264,761,884,65,62,465,519,629
418,145,464,368,79,301,577,617,59,504,110,945,455,222,392,528,854,506,337,537
369,437,553,627,527,864,762,60,250,173,416,769,526,275,251,282,798,160,120,307
661,848,126,578,821,531,109,267,588,482,928,504,301,567,521,426,523,287,631,874
365,425,303,258,515,115,324,164,878,193,517,437,943,779,243,388,423,917,814,860
751,534,519,186,918,890,297,339,639,524,886,140,187,688,715,279,161,686,810,219
764,551,518,495,118,66,824,778,801,790,883,198,164,899,79,462,430,259,830,343
926,758,618,58,121,922,124,538,869,135,149,361,899,119,567,777,78,792,407,827
340,502,282,439,304,836,802,127,285,637,528,165,61,292,70,720,894,383,675,129
503,856,375,500,362,884,590,335,435,476,790,866,279,526,107,825,305,880,55,232
156,63,503,530,575,831,666,636,161,738,549,135,824,823,110,819,684,69,118,265
774,786,639,876,557,947,133,78,158,256,357,858,130,554,550,360,504,297,219,747
510,744,582,123,74,584,63,515,577,777,337,850,197,50,294,912,434,72,792,534
586,708,751,273,513,570,664,337,464,224,631,546,866,516,562,266,452,303,585,391
575,301,747,743,510,150,584,869,135,348,432,369,383,667,54,665,377,791,272,808
571,232,427,628,621,68,847,948,384,192,114,426,573,813,447,160,751,867,50,901
247,796,994,106,626,232,136,123,254,639,816,144,462,122,505,915,536,221,419,812
418,887,854,779,718,554,667,924,529,74,365,301,775,497,441,198,50,370,455,898
567,516,898,860,228,464,265,750,415,829,747,536,562,812,623,105,882,353,55,846
636,275,524,513,688,188,139,546,780,782,663,74,263,924,831,541,981,626,499,848
125,137,620,268,883,252,359,877,533,587,782,148,617,496,916,62,818,913,708,561
389,510,357,539,143,78,106,766,638,921,901,502,595,239,681,220,589,922,528,767
198,522,139,111,260,378,149,749,810,569,502,627,857,388,810,662,812,835,382,976
358,738,779,140,538,900,945,326,500,848,797,496,220,455,428,110,823,944,623,252
866,528,567,614,340,743,308,124,147,164,67,592,924,557,301,134,427,846,346,227
900,916,308,246,530,243,638,595,922,427,353,493,883,245,271,223,738,762,860,375
115,197,557,459,568,880,628,779,913,860,793,305,542,616,251,565,3,108,383,137
832,880,752,66,296,620,269,196,824,744,69,637,885,555,614,429,162,814,284,403
793,51,792,69,147,452,831,552,517,807,280,287,535,60,294,556,550,189,736,698
889,831,439,779,773,630,263,105,280,737,743,1,133,736,559,186,770,420,798,526
511,537,594,165,384,638,765,884,421,457,378,376,457,419,241,916,370,614,285,619
67,364,808,866,13,114,230,50,296,821,899,263,136,630,572,828,238,126,312,787
143,327,300,239,561,459,949,538,673,147,186,54,589,504,914,119,796,881,921,497
421,580,568,543,853,573,422,746,772,766,747,949,227,244,719,417,422,401,163,260
914,360,571,808,74,193,544,863,551,852,949,134,630,456,63,72,792,930,249,782
534,990,895,459,338,65,232,626,252,617,433,720,238,248,869,621,800,626,50,804
380,865,108,307,69,290,53,622,21,744,798,573,155,866,551,366,437,781,758,268
518,521,634,360,575,285,258,848,149,339,589,306,138,822,502,77,761,85,913,547
463,738,668,302,234,812,444,294,431,308,386,441,263,424,671,376,50,536,58,661
835,791,260,798,533,108,19,228,615,924,559,160,337,591,539,388,584,365,575,535
764,272,551,384,633,542,623,803,908,512,381,520,854,497,451,836,64,365,556,302
661,458,196,268,464,50,802,358,359,136,917,663,587,198,122,884,433,689,579,661
340,155,53,590,759,252,526,114,545,482,815,521,827,665,472,504,770,380,552,817
241,464,198,257,426,22,917,390,521,742,302,387,452,120,578,717,386,75,554,619
153,585,785,361,561,746,834,186,511,733,132,295,771,504,259,382,154,50,528,669
275,289,591,5,242,198,721,300,921,505,688,339,668,66,452,453,148,197,740,919
574,768,308,529,429,549,532,351,716,495,124,482,351,435,862,459,57,987,584,662
573,765,829,232,569,76,720,51,850,451,582,583,446,913,70,133,856,391,380,542
4,849,525,247,593,384,881,122,383,949,794,61,802,455,786,289,796,921,737,665
501,765,251,441,186,292,231,563,791,886,442,470,856,150,135,482,462,671,788,451
460,745,379,186,919,73,423,771,863,0,64,73,463,387,816,914,312,834,261,164
852,310,267,877,626,949,578,590,248,514,292,865,577,561,823,129,243,600,630,504
587,667,522,834,887,55,711,244,309,438,815,437,526,562,945,526,858,549,528,307
252,880,784,534,975,520,299,79,635,451,421,437,921,798,283,913,52,145,750,849
775,756,131,453,351,188,364,548,637,593,196,386,898,924,252,752,814,629,666,320
568,59,228,673,152,627,913,513,75,450,497,779,116,122,628,259,257,863,732,64
428,378,193,806,823,551,452,620,791,812,711,503,573,512,384,116,229,846,379,883
720,589,514,105,617,455,152,856,543,379,832,499,232,271,542,258,578,619,233,684
794,766,137,925,537,464,739,819,556,822,614,291,756,771,256,66,901,905,739,167
436,437,671,774,667,436,520,800,50,444,162,635,576,196,160,758,302,914,786,627
375,753,719,497,786,853,377,263,619,740,815,166,141,533,51,664,824,20,68,50
789,353,275,885,135,264,243,277,309,688,122,62,252,307,543,231,612,566,666,869
749,56,284,239,743,851,767,556,417,525,285,282,272,619,252,135,114,629,555,997
273,234,421,69,157,808,552,282,759,806,877,238,744,270,928,510,941,287,788,248
881,380,423,808,431,256,108,299,306,57,880,595,416,225,627,766,137,874,825,250
889,751,593,568,548,500,281,54,548,664,575,897,130,539,504,145,782,52,541,371
618,134,62,526,743,638,281,76,834,766,241,349,338,507,142,856,538,525,435,739
529,771,635,123,224,323,716,753,824,436,220,573,285,812,631,165,569,61,510,826
312,273,763,259,555,254,883,639,443,920,222,266,533,511,129,944,286,288,155,132
278,447,383,526,114,233,715,947,626,763,307,114,155,523,198,550,263,156,802,856
106,889,857,767,297,793,917,687,753,57,150,99,109,514,545,424,383,463,428,746
892,674,198,789,459,926,593,375,561,426,912,304,621,795,636,276,614,113,359,811
855,815,865,190,763,273,361,522,786,409,386,541,267,531,197,257,65,455,513,795
437,224,56,583,233,140,404,430,921,288,517,525,914,861,423,880,156,916,617,129
416,521,255,468,368,688,56,638,738,385,417,50,749,451,625,454,866,880,523,805
336,919,861,71,506,567,18,243,243,804,507,382,453,270,258,631,424,822,359,520
557,352,228,830,784,853,231,778,629,769,794,554,716,497,128,225,767,59,600,573
437,896,79,907,572,760,65,122,368,75,133,50,532,850,268,810,461,535,740,378
571,503,358,122,441,419,419,765,592,51,565,452,887,455,372,369,768,246,536,632
622,425,629,939,255,263,295,549,541,669,256,106,855,189,249,923,375,238,309,270
810,366,562,591,780,736,11,767,819,515,590,620,577,925,511,550,887,857,819,148
885,248,533,360,495,236,138,251,160,190,553,798,678,196,864,578,59,772,783,296
634,156,264,711,581,59,146,72,463,434,483,893,386,228,571,307,926,357,897,339
891,281,717,662,635,676,506,269,359,78,195,862,784,750,552,525,233,127,438,281
162,425,237,76,111,364,60,639,826,263,128,247,877,546,585,849,393,456,687,111
285,593,282,293,806,290,441,857,508,419,118,592,275,545,187,826,466,450,385,430
109,791,431,767,993,663,662,826,416,784,816,557,527,721,546,251,806,308,761,452
294,254,112,156,772,495,922,123,862,358,495,665,408,585,565,242,302,882,880,73
166,230,75,797,116,750,781,504,786,802,532,128,257,776,712,546,813,852,297,133
340,776,413,539,567,109,614,135,797,53,428,73,440,893,197,420,231,266,897,52
353,540,160,159,152,639,518,774,223,945,595,131,256,167,593,666,521,166,383,731
430,718,111,632,771,851,900,395,557,454,430,924,337,588,546,755,777,356,381,784
340,754,857,428,785,753,781,588,526,592,275,638,67,530,766,126,551,8,265,114
456,433,591,319,595,106,914,621,368,149,74,361,60,756,145,864,298,455,746,237
439,117,198,432,340,595,740,890,8,854,279,820,124,496,293,741,221,887,879,564
568,499,360,663,442,900,191,235,566,358,426,572,291,451,499,668,718,284,766,987
616,592,265,139,165,514,153,239,368,848,304,520,269,582,533,823,105,878,431,603
520,557,247,760,826,823,369,11,547,617,744,890,186,520,162,760,586,141,454,422
146,814,295,534,824,294,795,880,500,679,562,451,914,461,628,858,738,776,849,282
297,544,196,386,239,463,152,542,672,634,768,333,245,774,456,895,69,835,441,515
456,786,793,889,287,484,513,818,494,573,256,376,108,564,865,383,627,385,291,510
236,70,743,460,802,893,120,715,900,163,535,425,226,513,822,583,699,525,635,877
671,534,892,769,422,756,304,802,620,386,535,495,851,14,889,806,571,298,853,390
914,279,576,262,421,880,521,112,338,632,563,922,242,355,743,332,236,240,634,508
483,673,916,890,157,912,139,859,571,798,520,895,242,546,269,819,864,378,792,137
244,306,273,299,821,187,538,775,766,890,277,799,712,77,870,541,573,813,820,231
755,277,304,277,452,242,744,247,264,593,292,279,429,559,334,271,269,135,288,240
914,189,270,64,3,562,866,533,867,559,868,548,736,241,388,242,261,246,832,546
776,848,272,629,793,272,158,720,277,498,433,923,826,273,582,54,902,53,132,860
815,578,438,378,797,818,562,615,219,526,773,864,520,794,718,106,795,160,292,6
885,338,770,752,433,155,264,245,257,811,442,945,633,530,497,666,576,866,489,454
523,367,353,634,661,268,829,577,738,787,762,705,537,421,265,944,153,258,137,518
615,811,377,815,68,532,760,580,494,273,108,186,850,568,362,254,367,343,663,833
805,769,924,335,193,385,775,528,113,224,434,502,794,418,756,628,764,991,879,749
914,166,799,408,836,617,833,626,783,737,752,521,671,772,420,53,632,463,255,578
522,927,328,914,376,246,626,742,138,628,923,589,893,774,869,359,924,138,633,351
220,617,62,223,813,146,618,310,58,825,155,827,334,674,568,824,298,849,504,223
281,629,828,61,921,276,635,625,771,671,494,923,508,160,500,747,667,989,461,835
67,132,431,132,823,946,257,361,848,867,156,553,634,615,228,889,887,536,845,74
291,59,666,488,771,636,263,821,300,736,562,775,750,854,568,108,638,892,291,353
194,718,561,501,857,434,233,535,529,586,629,546,900,251,749,114,337,132,626,489
779,503,708,755,258,357,439,239,363,227,360,631,234,622,513,889,336,833,64,244
626,258,635,365,918,420,135,310,505,373,71,867,75,55,517,156,310,152,897,578
433,454,916,898,285,160,862,893,802,437,113,536,426,557,160,130,243,731,817,258
79,593,534,802,669,895,360,306,987,522,508,560,116,867,777,139,811,864,664,54
756,780,489,281,783,856,142,159,263,50,338,227,621,821,591,591,773,781,746,553
533,162,269,270,979,153,633,124,157,855,351,500,141,416,637,817,105,165,251,108
752,129,443,219,748,809,797,817,133,524,429,340,120,637,813,780,483,524,534,770
221,945,219,526,834,66,685,836,301,226,107,623,894,290,521,482,890,451,590,805
108,390,113,186,130,442,886,151,384,547,402,738,79,719,509,825,882,462,775,846
302,590,799,294,881,266,718,8,382,431,564,582,762,220,795,546,388,366,453,499
65,715,456,790,301,51,776,719,543,782,58,563,372,116,758,529,673,482,806,547
832,386,460,692,71,574,823,625,338,291,66,109,384,745,847,747,383,589,386,592
527,583,763,916,375,54,460,755,784,58,786,423,309,852,245,153,489,462,807,851
571,663,715,462,795,266,463,299,531,930,755,291,112,749,924,895,518,914,767,483
891,265,879,226,291,517,252,272,711,270,857,524,797,365,292,256,451,383,118,494
928,635,196,112,292,519,820,425,541,924,130,797,462,857,122,878,62,617,338,475
562,78,821,105,518,749,886,358,680,868,195,438,222,802,247,830,828,920,54,424
381,482,556,767,624,229,106,673,849,822,379,813,818,264,345,813,749,120,922,153
290,458,160,356,302,877,452,57,631,761,661,670,134,859,936,750,359,671,661,891
739,61,51,119,590,521,736,163,364,737,769,282,439,252,703,621,256,438,790,529
618,234,737,603,582,814,277,186,231,507,112,482,68,787,161,138,196,115,531,562
618,364,134,836,664,114,69,758,362,80,753,594,561,458,514,293,925,59,791,137
247,922,763,662,744,494,53,861,331,799,573,721,336,901,848,721,108,523,881,283
665,792,338,122,587,376,377,232,521,199,434,388,164,437,113,79,748,79,622,869
289,246,275,662,627,433,941,890,666,759,230,77,228,514,785,456,279,433,746,137
747,799,661,793,736,863,756,385,380,77,186,191,50,918,623,139,298,486,377,895
572,272,361,132,846,548,189,196,807,132,747,197,366,565,878,748,148,271,666,199
319,274,754,575,293,337,580,51,923,864,816,387,832,196,340,567,246,852,535,830
618,273,147,529,760,739,757,418,265,304,798,417,497,496,916,617,448,142,819,309
920,373,814,775,793,629,233,900,575,131,810,312,161,778,482,186,163,560,893,110
188,129,546,738,261,70,270,249,592,134,565,768,160,378,293,792,532,627,942,615
460,812,50,158,509,108,149,849,792,711,824,79,270,504,823,305,900,108,381,584
260,768,64,746,896,550,529,148,62,506,510,800,606,778,159,141,944,50,810,787
505,762,883,252,795,436,141,913,64,113,285,120,633,561,903,666,261,766,389,516
442,807,388,923,284,671,926,285,615,897,664,132,471,508,538,761,423,454,582,55
816,281,846,386,415,152,228,879,514,814,161,311,744,356,64,131,802,119,789,751
424,450,675,159,896,230,560,124,749,352,167,419,251,133,550,546,633,517,234,428
561,431,667,525,553,536,366,892,529,271,535,616,130,748,458,846,807,590,467,667
892,164,310,355,719,17,718,636,502,76,921,284,166,496,639,292,67,915,761,124
897,127,261,360,134,831,220,559,427,494,806,365,255,629,546,762,812,446,526,531
821,538,434,901,787,459,433,615,737,853,539,533,271,520,539,561,317,778,835,900
190,846,772,280,452,167,870,736,637,425,716,507,758,550,899,928,565,307,756,909
808,63,798,295,110,867,754,496,224,743,557,521,893,740,230,255,584,853,702,312
887,70,336,851,523,457,611,514,256,307,360,451,825,813,191,542,544,277,432,916
924,990,575,791,162,228,57,286,517,525,455,110,928,511,834,61,296,108,72,510
591,631,813,536,773,794,797,138,738,302,243,886,527,5,270,225,361,531,362,510
268,747,384,503,665,223,485,762,132,223,858,539,434,355,817,532,949,284,106,619
775,574,924,67,819,255,335,801,492,771,352,524,513,141,60,223,531,754,189,923
621,717,780,821,747,307,627,288,544,790,360,604,459,418,309,818,60,887,630,854
436,812,740,449,378,560,802,235,391,276,194,310,627,265,821,516,867,818,426,889
673,907,535,672,77,243,265,277,121,137,221,137,925,791,105,736,496,525,505,166
668,153,782,889,281,460,945,520,524,107,493,812,247,265,854,870,514,417,292,809
273,540,946,58,776,564,219,228,546,546,429,449,594,147,502,383,55,262,284,503
891,360,870,144,534,759,751,821,536,390,435,935,286,543,252,663,268,920,235,614
546,111,555,350,752,236,153,595,811,437,886,122,914,265,664,377,850,745,746,948
787,548,337,886,625,163,869,721,273,440,788,662,555,834,527,434,853,854,374,555`;

// solve1(inputExample);
// solve1(input);
// solve2(inputExample2);
solve2(input);
