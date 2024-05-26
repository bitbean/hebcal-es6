import test from 'ava';
import {months} from '@hebcal/hdate';
import {HDate} from '@hebcal/hdate';
import {tachanun_} from './tachanun.js';

test('tachanun', (t) => {
  const startAbs = HDate.hebrew2abs(5782, months.TISHREI, 1);
  const endAbs = HDate.hebrew2abs(5783, months.TISHREI, 1);
  const actual = [];
  for (let abs = startAbs; abs < endAbs; abs++) {
    const hd = new HDate(abs);
    const tach = tachanun_(hd, false);
    actual.push([hd.abs(), tach]);
  }
  const expected = [
    [738040, {shacharit: false, mincha: false, allCongs: false}],
    [738041, {shacharit: false, mincha: false, allCongs: false}],
    [738042, {shacharit: true, mincha: true, allCongs: true}],
    [738043, {shacharit: true, mincha: false, allCongs: true}],
    [738044, {shacharit: false, mincha: true, allCongs: true}],
    [738045, {shacharit: true, mincha: true, allCongs: true}],
    [738046, {shacharit: true, mincha: true, allCongs: true}],
    [738047, {shacharit: true, mincha: true, allCongs: true}],
    [738048, {shacharit: false, mincha: false, allCongs: false}],
    [738049, {shacharit: false, mincha: false, allCongs: false}],
    [738050, {shacharit: false, mincha: false, allCongs: false}],
    [738051, {shacharit: false, mincha: false, allCongs: false}],
    [738052, {shacharit: false, mincha: false, allCongs: false}],
    [738053, {shacharit: false, mincha: false, allCongs: false}],
    [738054, {shacharit: false, mincha: false, allCongs: false}],
    [738055, {shacharit: false, mincha: false, allCongs: false}],
    [738056, {shacharit: false, mincha: false, allCongs: false}],
    [738057, {shacharit: false, mincha: false, allCongs: false}],
    [738058, {shacharit: false, mincha: false, allCongs: false}],
    [738059, {shacharit: false, mincha: false, allCongs: false}],
    [738060, {shacharit: false, mincha: false, allCongs: false}],
    [738061, {shacharit: false, mincha: false, allCongs: false}],
    [738062, {shacharit: false, mincha: false, allCongs: false}],
    [738063, {shacharit: false, mincha: false, allCongs: false}],
    [738064, {shacharit: true, mincha: false, allCongs: false}],
    [738065, {shacharit: false, mincha: true, allCongs: false}],
    [738066, {shacharit: true, mincha: true, allCongs: false}],
    [738067, {shacharit: true, mincha: true, allCongs: false}],
    [738068, {shacharit: true, mincha: false, allCongs: false}],
    [738069, {shacharit: false, mincha: false, allCongs: false}],
    [738070, {shacharit: false, mincha: false, allCongs: false}],
    [738071, {shacharit: true, mincha: false, allCongs: true}],
    [738072, {shacharit: false, mincha: true, allCongs: true}],
    [738073, {shacharit: true, mincha: true, allCongs: true}],
    [738074, {shacharit: true, mincha: true, allCongs: true}],
    [738075, {shacharit: true, mincha: true, allCongs: true}],
    [738076, {shacharit: true, mincha: true, allCongs: true}],
    [738077, {shacharit: true, mincha: true, allCongs: true}],
    [738078, {shacharit: true, mincha: false, allCongs: true}],
    [738079, {shacharit: false, mincha: true, allCongs: true}],
    [738080, {shacharit: true, mincha: true, allCongs: true}],
    [738081, {shacharit: true, mincha: true, allCongs: true}],
    [738082, {shacharit: true, mincha: true, allCongs: true}],
    [738083, {shacharit: true, mincha: true, allCongs: true}],
    [738084, {shacharit: true, mincha: true, allCongs: true}],
    [738085, {shacharit: true, mincha: false, allCongs: true}],
    [738086, {shacharit: false, mincha: true, allCongs: true}],
    [738087, {shacharit: true, mincha: true, allCongs: true}],
    [738088, {shacharit: true, mincha: true, allCongs: true}],
    [738089, {shacharit: true, mincha: true, allCongs: true}],
    [738090, {shacharit: true, mincha: true, allCongs: true}],
    [738091, {shacharit: true, mincha: true, allCongs: true}],
    [738092, {shacharit: true, mincha: false, allCongs: true}],
    [738093, {shacharit: false, mincha: true, allCongs: true}],
    [738094, {shacharit: true, mincha: true, allCongs: true}],
    [738095, {shacharit: true, mincha: true, allCongs: true}],
    [738096, {shacharit: true, mincha: true, allCongs: true}],
    [738097, {shacharit: true, mincha: true, allCongs: true}],
    [738098, {shacharit: true, mincha: false, allCongs: true}],
    [738099, {shacharit: false, mincha: false, allCongs: false}],
    [738100, {shacharit: false, mincha: true, allCongs: true}],
    [738101, {shacharit: true, mincha: true, allCongs: true}],
    [738102, {shacharit: true, mincha: true, allCongs: true}],
    [738103, {shacharit: true, mincha: true, allCongs: true}],
    [738104, {shacharit: true, mincha: true, allCongs: true}],
    [738105, {shacharit: true, mincha: true, allCongs: true}],
    [738106, {shacharit: true, mincha: false, allCongs: true}],
    [738107, {shacharit: false, mincha: true, allCongs: true}],
    [738108, {shacharit: true, mincha: true, allCongs: true}],
    [738109, {shacharit: true, mincha: true, allCongs: true}],
    [738110, {shacharit: true, mincha: true, allCongs: true}],
    [738111, {shacharit: true, mincha: true, allCongs: true}],
    [738112, {shacharit: true, mincha: true, allCongs: true}],
    [738113, {shacharit: true, mincha: false, allCongs: true}],
    [738114, {shacharit: false, mincha: true, allCongs: true}],
    [738115, {shacharit: true, mincha: true, allCongs: true}],
    [738116, {shacharit: true, mincha: true, allCongs: true}],
    [738117, {shacharit: true, mincha: true, allCongs: true}],
    [738118, {shacharit: true, mincha: true, allCongs: true}],
    [738119, {shacharit: true, mincha: true, allCongs: true}],
    [738120, {shacharit: true, mincha: false, allCongs: true}],
    [738121, {shacharit: false, mincha: true, allCongs: true}],
    [738122, {shacharit: true, mincha: false, allCongs: true}],
    [738123, {shacharit: false, mincha: false, allCongs: false}],
    [738124, {shacharit: false, mincha: false, allCongs: false}],
    [738125, {shacharit: false, mincha: false, allCongs: false}],
    [738126, {shacharit: false, mincha: false, allCongs: false}],
    [738127, {shacharit: false, mincha: false, allCongs: false}],
    [738128, {shacharit: false, mincha: false, allCongs: false}],
    [738129, {shacharit: false, mincha: false, allCongs: false}],
    [738130, {shacharit: false, mincha: false, allCongs: false}],
    [738131, {shacharit: false, mincha: false, allCongs: false}],
    [738132, {shacharit: true, mincha: true, allCongs: true}],
    [738133, {shacharit: true, mincha: true, allCongs: true}],
    [738134, {shacharit: true, mincha: false, allCongs: true}],
    [738135, {shacharit: false, mincha: true, allCongs: true}],
    [738136, {shacharit: true, mincha: true, allCongs: true}],
    [738137, {shacharit: true, mincha: true, allCongs: true}],
    [738138, {shacharit: true, mincha: true, allCongs: true}],
    [738139, {shacharit: true, mincha: true, allCongs: true}],
    [738140, {shacharit: true, mincha: true, allCongs: true}],
    [738141, {shacharit: true, mincha: false, allCongs: true}],
    [738142, {shacharit: false, mincha: true, allCongs: true}],
    [738143, {shacharit: true, mincha: true, allCongs: true}],
    [738144, {shacharit: true, mincha: true, allCongs: true}],
    [738145, {shacharit: true, mincha: true, allCongs: true}],
    [738146, {shacharit: true, mincha: true, allCongs: true}],
    [738147, {shacharit: true, mincha: true, allCongs: true}],
    [738148, {shacharit: true, mincha: false, allCongs: true}],
    [738149, {shacharit: false, mincha: true, allCongs: true}],
    [738150, {shacharit: true, mincha: true, allCongs: true}],
    [738151, {shacharit: true, mincha: true, allCongs: true}],
    [738152, {shacharit: true, mincha: true, allCongs: true}],
    [738153, {shacharit: true, mincha: true, allCongs: true}],
    [738154, {shacharit: true, mincha: true, allCongs: true}],
    [738155, {shacharit: true, mincha: false, allCongs: true}],
    [738156, {shacharit: false, mincha: true, allCongs: true}],
    [738157, {shacharit: true, mincha: false, allCongs: true}],
    [738158, {shacharit: false, mincha: false, allCongs: false}],
    [738159, {shacharit: true, mincha: true, allCongs: true}],
    [738160, {shacharit: true, mincha: true, allCongs: true}],
    [738161, {shacharit: true, mincha: true, allCongs: true}],
    [738162, {shacharit: true, mincha: false, allCongs: true}],
    [738163, {shacharit: false, mincha: true, allCongs: true}],
    [738164, {shacharit: true, mincha: true, allCongs: true}],
    [738165, {shacharit: true, mincha: true, allCongs: true}],
    [738166, {shacharit: true, mincha: true, allCongs: true}],
    [738167, {shacharit: true, mincha: true, allCongs: true}],
    [738168, {shacharit: true, mincha: true, allCongs: true}],
    [738169, {shacharit: true, mincha: false, allCongs: true}],
    [738170, {shacharit: false, mincha: true, allCongs: true}],
    [738171, {shacharit: true, mincha: false, allCongs: true}],
    [738172, {shacharit: false, mincha: false, allCongs: false}],
    [738173, {shacharit: true, mincha: true, allCongs: true}],
    [738174, {shacharit: true, mincha: true, allCongs: true}],
    [738175, {shacharit: true, mincha: true, allCongs: true}],
    [738176, {shacharit: true, mincha: false, allCongs: true}],
    [738177, {shacharit: false, mincha: true, allCongs: true}],
    [738178, {shacharit: true, mincha: true, allCongs: true}],
    [738179, {shacharit: true, mincha: true, allCongs: true}],
    [738180, {shacharit: true, mincha: true, allCongs: true}],
    [738181, {shacharit: true, mincha: true, allCongs: true}],
    [738182, {shacharit: true, mincha: true, allCongs: true}],
    [738183, {shacharit: true, mincha: false, allCongs: true}],
    [738184, {shacharit: false, mincha: true, allCongs: true}],
    [738185, {shacharit: true, mincha: true, allCongs: true}],
    [738186, {shacharit: true, mincha: false, allCongs: true}],
    [738187, {shacharit: false, mincha: false, allCongs: false}],
    [738188, {shacharit: false, mincha: false, allCongs: false}],
    [738189, {shacharit: true, mincha: true, allCongs: true}],
    [738190, {shacharit: true, mincha: false, allCongs: true}],
    [738191, {shacharit: false, mincha: true, allCongs: true}],
    [738192, {shacharit: true, mincha: true, allCongs: true}],
    [738193, {shacharit: true, mincha: true, allCongs: true}],
    [738194, {shacharit: true, mincha: true, allCongs: true}],
    [738195, {shacharit: true, mincha: true, allCongs: true}],
    [738196, {shacharit: true, mincha: true, allCongs: true}],
    [738197, {shacharit: true, mincha: false, allCongs: true}],
    [738198, {shacharit: false, mincha: true, allCongs: true}],
    [738199, {shacharit: true, mincha: true, allCongs: true}],
    [738200, {shacharit: true, mincha: false, allCongs: true}],
    [738201, {shacharit: false, mincha: false, allCongs: false}],
    [738202, {shacharit: true, mincha: true, allCongs: true}], // 15 Adar I - "Sushuan Purim Katan" isn't a thing
    [738203, {shacharit: true, mincha: true, allCongs: true}],
    [738204, {shacharit: true, mincha: false, allCongs: true}],
    [738205, {shacharit: false, mincha: true, allCongs: true}],
    [738206, {shacharit: true, mincha: true, allCongs: true}],
    [738207, {shacharit: true, mincha: true, allCongs: true}],
    [738208, {shacharit: true, mincha: true, allCongs: true}],
    [738209, {shacharit: true, mincha: true, allCongs: true}],
    [738210, {shacharit: true, mincha: true, allCongs: true}],
    [738211, {shacharit: true, mincha: false, allCongs: true}],
    [738212, {shacharit: false, mincha: true, allCongs: true}],
    [738213, {shacharit: true, mincha: true, allCongs: true}],
    [738214, {shacharit: true, mincha: true, allCongs: true}],
    [738215, {shacharit: true, mincha: true, allCongs: true}],
    [738216, {shacharit: true, mincha: false, allCongs: true}],
    [738217, {shacharit: false, mincha: false, allCongs: false}],
    [738218, {shacharit: false, mincha: false, allCongs: false}],
    [738219, {shacharit: false, mincha: true, allCongs: true}],
    [738220, {shacharit: true, mincha: true, allCongs: true}],
    [738221, {shacharit: true, mincha: true, allCongs: true}],
    [738222, {shacharit: true, mincha: true, allCongs: true}],
    [738223, {shacharit: true, mincha: true, allCongs: true}],
    [738224, {shacharit: true, mincha: true, allCongs: true}],
    [738225, {shacharit: true, mincha: false, allCongs: true}],
    [738226, {shacharit: false, mincha: true, allCongs: true}],
    [738227, {shacharit: true, mincha: true, allCongs: true}],
    [738228, {shacharit: true, mincha: true, allCongs: true}],
    [738229, {shacharit: true, mincha: true, allCongs: true}],
    [738230, {shacharit: true, mincha: false, allCongs: true}],
    [738231, {shacharit: false, mincha: false, allCongs: false}],
    [738232, {shacharit: false, mincha: false, allCongs: false}],
    [738233, {shacharit: false, mincha: true, allCongs: true}],
    [738234, {shacharit: true, mincha: true, allCongs: true}],
    [738235, {shacharit: true, mincha: true, allCongs: true}],
    [738236, {shacharit: true, mincha: true, allCongs: true}],
    [738237, {shacharit: true, mincha: true, allCongs: true}],
    [738238, {shacharit: true, mincha: true, allCongs: true}],
    [738239, {shacharit: true, mincha: false, allCongs: true}],
    [738240, {shacharit: false, mincha: true, allCongs: true}],
    [738241, {shacharit: true, mincha: true, allCongs: true}],
    [738242, {shacharit: true, mincha: true, allCongs: true}],
    [738243, {shacharit: true, mincha: true, allCongs: true}],
    [738244, {shacharit: true, mincha: true, allCongs: true}],
    [738245, {shacharit: true, mincha: true, allCongs: true}],
    [738246, {shacharit: true, mincha: false, allCongs: true}],
    [738247, {shacharit: false, mincha: false, allCongs: false}],
    [738248, {shacharit: false, mincha: false, allCongs: false}],
    [738249, {shacharit: false, mincha: false, allCongs: false}],
    [738250, {shacharit: false, mincha: false, allCongs: false}],
    [738251, {shacharit: false, mincha: false, allCongs: false}],
    [738252, {shacharit: false, mincha: false, allCongs: false}],
    [738253, {shacharit: false, mincha: false, allCongs: false}],
    [738254, {shacharit: false, mincha: false, allCongs: false}],
    [738255, {shacharit: false, mincha: false, allCongs: false}],
    [738256, {shacharit: false, mincha: false, allCongs: false}],
    [738257, {shacharit: false, mincha: false, allCongs: false}],
    [738258, {shacharit: false, mincha: false, allCongs: false}],
    [738259, {shacharit: false, mincha: false, allCongs: false}],
    [738260, {shacharit: false, mincha: false, allCongs: false}],
    [738261, {shacharit: false, mincha: false, allCongs: false}],
    [738262, {shacharit: false, mincha: false, allCongs: false}],
    [738263, {shacharit: false, mincha: false, allCongs: false}],
    [738264, {shacharit: false, mincha: false, allCongs: false}],
    [738265, {shacharit: false, mincha: false, allCongs: false}],
    [738266, {shacharit: false, mincha: false, allCongs: false}],
    [738267, {shacharit: false, mincha: false, allCongs: false}],
    [738268, {shacharit: false, mincha: false, allCongs: false}],
    [738269, {shacharit: false, mincha: false, allCongs: false}],
    [738270, {shacharit: false, mincha: false, allCongs: false}],
    [738271, {shacharit: false, mincha: false, allCongs: false}],
    [738272, {shacharit: false, mincha: false, allCongs: false}],
    [738273, {shacharit: false, mincha: false, allCongs: false}],
    [738274, {shacharit: false, mincha: false, allCongs: false}],
    [738275, {shacharit: false, mincha: false, allCongs: false}],
    [738276, {shacharit: false, mincha: false, allCongs: false}],
    [738277, {shacharit: false, mincha: false, allCongs: false}],
    [738278, {shacharit: true, mincha: true, allCongs: true}],
    [738279, {shacharit: true, mincha: true, allCongs: true}],
    [738280, {shacharit: true, mincha: true, allCongs: false}],
    [738281, {shacharit: true, mincha: false, allCongs: true}],
    [738282, {shacharit: false, mincha: true, allCongs: true}],
    [738283, {shacharit: true, mincha: true, allCongs: true}],
    [738284, {shacharit: true, mincha: true, allCongs: true}],
    [738285, {shacharit: true, mincha: true, allCongs: true}],
    [738286, {shacharit: true, mincha: true, allCongs: true}],
    [738287, {shacharit: true, mincha: true, allCongs: true}],
    [738288, {shacharit: true, mincha: false, allCongs: true}],
    [738289, {shacharit: false, mincha: true, allCongs: true}],
    [738290, {shacharit: true, mincha: true, allCongs: false}],
    [738291, {shacharit: true, mincha: true, allCongs: true}],
    [738292, {shacharit: true, mincha: true, allCongs: true}],
    [738293, {shacharit: true, mincha: false, allCongs: true}],
    [738294, {shacharit: false, mincha: false, allCongs: false}],
    [738295, {shacharit: true, mincha: false, allCongs: true}],
    [738296, {shacharit: false, mincha: true, allCongs: true}],
    [738297, {shacharit: true, mincha: true, allCongs: true}],
    [738298, {shacharit: true, mincha: true, allCongs: true}],
    [738299, {shacharit: true, mincha: true, allCongs: true}],
    [738300, {shacharit: true, mincha: true, allCongs: true}],
    [738301, {shacharit: true, mincha: true, allCongs: true}],
    [738302, {shacharit: true, mincha: false, allCongs: true}],
    [738303, {shacharit: false, mincha: true, allCongs: true}],
    [738304, {shacharit: true, mincha: true, allCongs: false}],
    [738305, {shacharit: true, mincha: false, allCongs: true}], // correct date for Yom Yerushalayim
    [738306, {shacharit: false, mincha: false, allCongs: false}],
    [738307, {shacharit: false, mincha: false, allCongs: false}],
    [738308, {shacharit: false, mincha: false, allCongs: false}],
    [738309, {shacharit: false, mincha: false, allCongs: false}],
    [738310, {shacharit: false, mincha: false, allCongs: false}],
    [738311, {shacharit: false, mincha: false, allCongs: false}],
    [738312, {shacharit: false, mincha: false, allCongs: false}],
    [738313, {shacharit: false, mincha: false, allCongs: false}],
    [738314, {shacharit: true, mincha: true, allCongs: false}],
    [738315, {shacharit: true, mincha: true, allCongs: false}],
    [738316, {shacharit: true, mincha: false, allCongs: false}],
    [738317, {shacharit: false, mincha: true, allCongs: false}],
    [738318, {shacharit: true, mincha: true, allCongs: false}],
    [738319, {shacharit: true, mincha: true, allCongs: true}],
    [738320, {shacharit: true, mincha: true, allCongs: true}],
    [738321, {shacharit: true, mincha: true, allCongs: true}],
    [738322, {shacharit: true, mincha: true, allCongs: true}],
    [738323, {shacharit: true, mincha: false, allCongs: true}],
    [738324, {shacharit: false, mincha: true, allCongs: true}],
    [738325, {shacharit: true, mincha: true, allCongs: true}],
    [738326, {shacharit: true, mincha: true, allCongs: true}],
    [738327, {shacharit: true, mincha: true, allCongs: true}],
    [738328, {shacharit: true, mincha: true, allCongs: true}],
    [738329, {shacharit: true, mincha: true, allCongs: true}],
    [738330, {shacharit: true, mincha: false, allCongs: true}],
    [738331, {shacharit: false, mincha: true, allCongs: true}],
    [738332, {shacharit: true, mincha: true, allCongs: true}],
    [738333, {shacharit: true, mincha: true, allCongs: true}],
    [738334, {shacharit: true, mincha: false, allCongs: true}],
    [738335, {shacharit: false, mincha: false, allCongs: false}],
    [738336, {shacharit: false, mincha: false, allCongs: false}],
    [738337, {shacharit: true, mincha: false, allCongs: true}],
    [738338, {shacharit: false, mincha: true, allCongs: true}],
    [738339, {shacharit: true, mincha: true, allCongs: true}],
    [738340, {shacharit: true, mincha: true, allCongs: true}],
    [738341, {shacharit: true, mincha: true, allCongs: true}],
    [738342, {shacharit: true, mincha: true, allCongs: true}],
    [738343, {shacharit: true, mincha: true, allCongs: true}],
    [738344, {shacharit: true, mincha: false, allCongs: true}],
    [738345, {shacharit: false, mincha: true, allCongs: true}],
    [738346, {shacharit: true, mincha: true, allCongs: true}],
    [738347, {shacharit: true, mincha: true, allCongs: true}],
    [738348, {shacharit: true, mincha: true, allCongs: true}],
    [738349, {shacharit: true, mincha: true, allCongs: true}],
    [738350, {shacharit: true, mincha: true, allCongs: true}],
    [738351, {shacharit: true, mincha: false, allCongs: true}],
    [738352, {shacharit: false, mincha: true, allCongs: true}],
    [738353, {shacharit: true, mincha: true, allCongs: true}],
    [738354, {shacharit: true, mincha: true, allCongs: true}],
    [738355, {shacharit: true, mincha: true, allCongs: true}],
    [738356, {shacharit: true, mincha: true, allCongs: true}],
    [738357, {shacharit: true, mincha: true, allCongs: true}],
    [738358, {shacharit: true, mincha: false, allCongs: true}],
    [738359, {shacharit: false, mincha: true, allCongs: true}],
    [738360, {shacharit: true, mincha: true, allCongs: true}],
    [738361, {shacharit: true, mincha: true, allCongs: true}],
    [738362, {shacharit: true, mincha: true, allCongs: true}],
    [738363, {shacharit: true, mincha: true, allCongs: true}],
    [738364, {shacharit: true, mincha: false, allCongs: true}],
    [738365, {shacharit: false, mincha: false, allCongs: false}],
    [738366, {shacharit: false, mincha: true, allCongs: true}],
    [738367, {shacharit: true, mincha: true, allCongs: true}],
    [738368, {shacharit: true, mincha: true, allCongs: true}],
    [738369, {shacharit: true, mincha: true, allCongs: true}],
    [738370, {shacharit: true, mincha: true, allCongs: true}],
    [738371, {shacharit: true, mincha: true, allCongs: true}],
    [738372, {shacharit: true, mincha: false, allCongs: true}],
    [738373, {shacharit: false, mincha: false, allCongs: false}],
    [738374, {shacharit: false, mincha: false, allCongs: false}], // 10 Av (Tish'a B'Av observed)
    [738375, {shacharit: true, mincha: true, allCongs: true}],
    [738376, {shacharit: true, mincha: true, allCongs: true}],
    [738377, {shacharit: true, mincha: true, allCongs: true}],
    [738378, {shacharit: true, mincha: false, allCongs: true}],
    [738379, {shacharit: false, mincha: false, allCongs: false}],
    [738380, {shacharit: false, mincha: true, allCongs: true}],
    [738381, {shacharit: true, mincha: true, allCongs: true}],
    [738382, {shacharit: true, mincha: true, allCongs: true}],
    [738383, {shacharit: true, mincha: true, allCongs: true}],
    [738384, {shacharit: true, mincha: true, allCongs: true}],
    [738385, {shacharit: true, mincha: true, allCongs: true}],
    [738386, {shacharit: true, mincha: false, allCongs: true}],
    [738387, {shacharit: false, mincha: true, allCongs: true}],
    [738388, {shacharit: true, mincha: true, allCongs: true}],
    [738389, {shacharit: true, mincha: true, allCongs: true}],
    [738390, {shacharit: true, mincha: true, allCongs: true}],
    [738391, {shacharit: true, mincha: true, allCongs: true}],
    [738392, {shacharit: true, mincha: true, allCongs: true}],
    [738393, {shacharit: true, mincha: false, allCongs: true}],
    [738394, {shacharit: false, mincha: false, allCongs: false}],
    [738395, {shacharit: false, mincha: false, allCongs: false}],
    [738396, {shacharit: true, mincha: true, allCongs: true}],
    [738397, {shacharit: true, mincha: true, allCongs: true}],
    [738398, {shacharit: true, mincha: true, allCongs: true}],
    [738399, {shacharit: true, mincha: true, allCongs: true}],
    [738400, {shacharit: true, mincha: false, allCongs: true}],
    [738401, {shacharit: false, mincha: true, allCongs: true}],
    [738402, {shacharit: true, mincha: true, allCongs: true}],
    [738403, {shacharit: true, mincha: true, allCongs: true}],
    [738404, {shacharit: true, mincha: true, allCongs: true}],
    [738405, {shacharit: true, mincha: true, allCongs: true}],
    [738406, {shacharit: true, mincha: true, allCongs: true}],
    [738407, {shacharit: true, mincha: false, allCongs: true}],
    [738408, {shacharit: false, mincha: true, allCongs: true}],
    [738409, {shacharit: true, mincha: true, allCongs: true}],
    [738410, {shacharit: true, mincha: true, allCongs: true}],
    [738411, {shacharit: true, mincha: true, allCongs: true}],
    [738412, {shacharit: true, mincha: true, allCongs: true}],
    [738413, {shacharit: true, mincha: true, allCongs: true}],
    [738414, {shacharit: true, mincha: false, allCongs: true}],
    [738415, {shacharit: false, mincha: true, allCongs: true}],
    [738416, {shacharit: true, mincha: true, allCongs: true}],
    [738417, {shacharit: true, mincha: true, allCongs: true}],
    [738418, {shacharit: true, mincha: true, allCongs: true}],
    [738419, {shacharit: true, mincha: true, allCongs: true}],
    [738420, {shacharit: true, mincha: true, allCongs: true}],
    [738421, {shacharit: true, mincha: false, allCongs: true}],
    [738422, {shacharit: false, mincha: false, allCongs: false}], // 28 Elul isn't Erev RH
    [738423, {shacharit: false, mincha: false, allCongs: false}],
  ];
  for (let i = 0; i < actual.length; i++) {
    const abs = actual[i][0];
    const hd = new HDate(abs);
    t.deepEqual(actual[i], expected[i], `${i} - ${abs} - ${hd.getDay()} - ${hd.toString()}`);
  }
});
