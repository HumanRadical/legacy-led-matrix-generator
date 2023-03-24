# LED Matrix Generator
An LED matrix app made for testing LED colour code arrays.

### **Some sample code:**
---
Mario (16x16, snaked): 
```
["000000","000000","000000","000000","000000","DD1012","DEA090","D10000","C80000","C70000","BF3020","000000","000000","000000","000000","000000","000000","000000","D01000","C40010","BA5080","DE60E0","E150C0","EA00A0","F30080","F60050","FB3000","DB8018","000000","000000","000000","000000","000000","000000","000000","000000","78441E","7C4928","865132","DAA488","E2B497","DAB195","321280","CCAB97","000000","000000","000000","000000","000000","000000","C1AF94","C2B69E","CBBEA0","302E2C","D5C2A2","D8C8A7","D7C4A6","D7C09D","735B34","D9C39B","5C523E","000000","000000","000000","000000","000000","000000","564526","DBC7A6","7E653C","DAC4A3","D9C6A8","D9C6A6","D4C1A1","CDBDA8","201811","CBBC9D","CBB796","BEAE8D","000000","000000","000000","1C1816","434035","302E2B","231AD0","CFBC9B","CEBB9B","D4C1A1","DAC7A6","C7B18D","5A441F","4B371B","000000","000000","000000","000000","000000","000000","000000","000000","C7B597","D6C3A2","D0BD9B","CBB794","C4B08F","C7B8A2","C7BA9C","BFB195","000000","000000","000000","000000","000000","000000","000000","000000","4325B3","D4F090","C64020","B1801E","7F2A9E","CD7000","D1101B","000000","000000","000000","000000","000000","000000","000000","B71C22","FB2000","F30080","7D21A4","E66018","EB0070","6329B3","AD902F","C91110","D41715","000000","000000","000000","000000","000000","DAB010","FD1030","F30090","D2701F","4F28BC","522BD6","5D30DC","7823A4","EA0080","F50040","F74010","D6111C","000000","000000","000000","000000","CBAE8B","E8B39B","F10013","7C21A6","F0D093","6530CD","512BCD","D6C752","57207F","CB802C","E2B797","D3A98E","000000","000000","000000","000000","CBB796","CAC9A5","DCA0A6","4521A9","542F8C","522DCA","5529DA","6037B2","562DC8","E69F89","D6C5A7","CBB79A","000000","000000","000000","000000","D0BC9D","CAB596","5B2CDA","6033E7","5C31E2","532DCF","4C28C0","532FC7","4D2ABD","4521A6","C6B692","D0BE9A","000000","000000","000000","000000","000000","000000","4222AB","4221AD","4223AE","000000","000000","522ACC","532CD7","512CD5","000000","000000","000000","000000","000000","000000","000000","5E553F","705568","6B505C","583D48","000000","000000","62484F","695056","634A4E","4D3D22","000000","000000","000000","000000","000000","3E2F16","4A3613","543C16","5A431A","614620","000000","000000","543C19","5B421A","5F4721","685021","61533C","000000","000000"]
```

Mario (RGB, 16x16, snaked):
```
["(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(221, 16, 18)","(222, 160, 144)","(209, 0, 0)","(200, 0, 0)","(199, 0, 0)","(191, 48, 32)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(208, 16, 0)","(196, 0, 16)","(186, 80, 128)","(222, 96, 224)","(225, 80, 192)","(234, 0, 160)","(243, 0, 128)","(246, 0, 80)","(251, 48, 0)","(219, 128, 24)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(120, 68, 30)","(124, 73, 40)","(134, 81, 50)","(218, 164, 136)","(226, 180, 151)","(218, 177, 149)","(50, 18, 128)","(204, 171, 151)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(193, 175, 148)","(194, 182, 158)","(203, 190, 160)","(48, 46, 44)","(213, 194, 162)","(216, 200, 167)","(215, 196, 166)","(215, 192, 157)","(115, 91, 52)","(217, 195, 155)","(92, 82, 62)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(86, 69, 38)","(219, 199, 166)","(126, 101, 60)","(218, 196, 163)","(217, 198, 168)","(217, 198, 166)","(212, 193, 161)","(205, 189, 168)","(32, 24, 17)","(203, 188, 157)","(203, 183, 150)","(190, 174, 141)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(28, 24, 22)","(67, 64, 53)","(48, 46, 43)","(35, 26, 208)","(207, 188, 155)","(206, 187, 155)","(212, 193, 161)","(218, 199, 166)","(199, 177, 141)","(90, 68, 31)","(75, 55, 27)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(199, 181, 151)","(214, 195, 162)","(208, 189, 155)","(203, 183, 148)","(196, 176, 143)","(199, 184, 162)","(199, 186, 156)","(191, 177, 149)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(67, 37, 179)","(212, 240, 144)","(198, 64, 32)","(177, 128, 30)","(127, 42, 158)","(205, 112, 0)","(209, 16, 27)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(183, 28, 34)","(251, 32, 0)","(243, 0, 128)","(125, 33, 164)","(230, 96, 24)","(235, 0, 112)","(99, 41, 179)","(173, 144, 47)","(201, 17, 16)","(212, 23, 21)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(218, 176, 16)","(253, 16, 48)","(243, 0, 144)","(210, 112, 31)","(79, 40, 188)","(82, 43, 214)","(93, 48, 220)","(120, 35, 164)","(234, 0, 128)","(245, 0, 64)","(247, 64, 16)","(214, 17, 28)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(203, 174, 139)","(232, 179, 155)","(241, 0, 19)","(124, 33, 166)","(240, 208, 147)","(101, 48, 205)","(81, 43, 205)","(214, 199, 82)","(87, 32, 127)","(203, 128, 44)","(226, 183, 151)","(211, 169, 142)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(203, 183, 150)","(202, 201, 165)","(220, 160, 166)","(69, 33, 169)","(84, 47, 140)","(82, 45, 202)","(85, 41, 218)","(96, 55, 178)","(86, 45, 200)","(230, 159, 137)","(214, 197, 167)","(203, 183, 154)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(208, 188, 157)","(202, 181, 150)","(91, 44, 218)","(96, 51, 231)","(92, 49, 226)","(83, 45, 207)","(76, 40, 192)","(83, 47, 199)","(77, 42, 189)","(69, 33, 166)","(198, 182, 146)","(208, 190, 154)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(66, 34, 171)","(66, 33, 173)","(66, 35, 174)","(0, 0, 0)","(0, 0, 0)","(82, 42, 204)","(83, 44, 215)","(81, 44, 213)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(94, 85, 63)","(112, 85, 104)","(107, 80, 92)","(88, 61, 72)","(0, 0, 0)","(0, 0, 0)","(98, 72, 79)","(105, 80, 86)","(99, 74, 78)","(77, 61, 34)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(0, 0, 0)","(62, 47, 22)","(74, 54, 19)","(84, 60, 22)","(90, 67, 26)","(97, 70, 32)","(0, 0, 0)","(0, 0, 0)","(84, 60, 25)","(91, 66, 26)","(95, 71, 33)","(104, 80, 33)","(97, 83, 60)","(0, 0, 0)","(0, 0, 0)"]
```

Link (16x16, snaked): 
```
["666666", "666666", "666666", "666666", "666666", "66cc00", "66cc00", "66cc00", "66cc00", "666666", "666666", "666666", "666666", "666666", "666666", "666666","666666", "666666", "666666", "666666", "cc3300", "cc3300", "cc3300", "cc3300", "66cc00", "66cc00", "66cc00", "66cc00", "66cc00", "666666", "666666", "666666","666666", "66cc00", "66cc00", "66cc00", "ff9933", "66cc00", "66cc00", "cc3300", "cc3300", "cc3300", "cc3300", "cc3300", "cc3300", "666666", "666666", "666666", "666666", "666666", "666666", "666666", "cc3300", "cc3300", "cc3300", "cc3300", "cc3300", "cc3300", "ff9933", "ff9933", "66cc00", "66cc00", "66cc00", "66cc00", "66cc00", "666666", "66cc00", "66cc00", "ff9933", "ff9933", "ff9933", "cc3300", "ff9933", "ff9933", "66cc00", "ff9933", "666666", "666666", "cc3300", "666666", "666666", "cc3300", "ff9933", "ff9933", "ff9933", "cc3300", "ff9933", "ff9933", "cc3300", "ff9933", "ff9933", "cc3300", "cc3300", "66cc00", "666666", "666666", "666666", "666666", "666666", "cc3300", "cc3300", "cc3300", "ff9933", "ff9933", "ff9933", "ff9933", "ff9933", "ff9933", "666666", "666666", "cc3300", "666666", "666666", "cc3300", "666666", "666666", "ff9933", "ff9933", "ff9933", "ff9933", "66cc00", "66cc00", "66cc00", "66cc00", "666666", "666666", "666666", "666666", "666666", "666666", "cc3300", "66cc00", "66cc00", "66cc00", "66cc00", "66cc00", "66cc00", "66cc00", "cc3300", "cc3300", "cc3300", "ff9933", "cc3300", "666666", "666666", "cc3300", "ff9933", "cc3300", "cc3300", "66cc00", "66cc00", "66cc00", "ff9933", "ff9933", "ff9933", "66cc00", "cc3300", "cc3300", "cc3300", "666666", "666666", "cc3300", "cc3300", "cc3300", "cc3300", "ff9933", "ff9933", "ff9933", "66cc00", "66cc00", "66cc00", "cc3300", "cc3300", "666666", "cc3300", "666666", "666666", "cc3300", "666666", "666666", "666666", "cc3300", "66cc00", "66cc00", "66cc00", "ff9933", "ff9933", "cc3300", "cc3300", "cc3300", "cc3300", "666666", "666666", "666666", "66cc00", "cc3300", "cc3300", "66cc00", "66cc00", "cc3300", "cc3300", "cc3300", "cc3300", "666666", "666666", "666666", "cc3300", "666666", "666666", "666666", "666666", "666666", "666666", "66cc00", "66cc00", "66cc00", "66cc00", "66cc00", "66cc00", "66cc00", "66cc00", "66cc00", "66cc00", "666666", "666666", "666666", "666666", "666666", "cc3300", "cc3300", "cc3300", "cc3300", "666666", "666666", "666666", "666666", "666666", "666666", "666666", "666666", "666666", "666666", "666666", "666666", "666666", "666666", "666666", "cc3300", "cc3300", "cc3300", "cc3300", "cc3300", "666666", "666666", "666666", "666666"]
```

Dig Dug (16x16, snaked): 
```
[0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x0066cc, 0x000000, 0x0066cc, 0x000000, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0x000000, 0x0066cc, 0x000000, 0x0066cc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x0066cc, 0x0066cc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0xff0000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xff0000, 0xff0000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x0066cc, 0x0066cc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0xff0000, 0xff0000, 0xff0000, 0x0066cc, 0x0066cc, 0x0066cc, 0x0066cc, 0xff0000, 0xff0000, 0xff0000, 0xff0000, 0xff0000, 0xff0000, 0xff0000, 0x000000, 0x000000, 0x000000, 0xff0000, 0xff0000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0x0066cc, 0x0066cc, 0x0066cc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000,  0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0xff0000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0xcccccc, 0xcccccc, 0xcccccc, 0xcccccc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000]
```

Qbert (16x16, snaked):
```
[0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xff6600, 0xff6600, 0xff6600, 0xff6600, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xff0033, 0xff0033, 0xff0033, 0xff0033, 0xff0033, 0xff6600, 0xff6600, 0xff6600, 0x000000, 0x000000, 0x000000, 0xff0033, 0xff0033, 0xff6600, 0xff0033, 0xffffcc, 0xffffcc, 0xff0033, 0xffffcc, 0xffffcc, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xff0033, 0x000000, 0x000000, 0xff0033, 0xff6600, 0xff6600, 0xff0033, 0xff0033, 0xff0033, 0xff0033, 0xff0033, 0xff6600, 0xff0033, 0xff0033, 0xff0033, 0xff0033, 0xff0033, 0xff0033, 0xff6600, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xff6600, 0xff6600, 0xff6600, 0xff6600, 0xff6600, 0xff6600, 0xff0033, 0xff0033, 0xff6600, 0xff6600, 0xff6600, 0xff0033, 0xff0033,  0xff0033, 0xff0033, 0xff0033, 0xff6600, 0xff6600, 0xff6600, 0xff6600, 0xff6600, 0xff6600, 0xff6600, 0xff6600, 0xff6600, 0xff6600, 0xff6600, 0x000000, 0x000000, 0x000000, 0xff6600, 0xff6600, 0xff6600, 0xff0033, 0xff0033, 0xff0033, 0xff6600, 0xff0033, 0xff6600, 0xff0033, 0xff6600, 0xff0033, 0xff6600, 0xff0033, 0xff0033, 0x000000, 0xff0033, 0xff0033, 0xff0033, 0xff0033, 0xff0033, 0xff6600, 0xff0033, 0xff0033, 0x000000, 0xff0033, 0xff0033, 0x000033, 0x000033, 0xff6600, 0x000000, 0x000000, 0xff0033, 0x000033, 0x000033, 0xff0033, 0x000000, 0x000000, 0x000000, 0xff0033, 0xff0033, 0xff0033, 0xff0033, 0xff0033, 0xff0033, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xff0033, 0xff0033, 0xff0033, 0xff0033, 0xff0033, 0x000000, 0x000000, 0x000000, 0x000000, 0xff0033, 0xff0033, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xff0033, 0x000000, 0x000000, 0xff0033, 0x000000, 0x000000, 0x000000, 0x000000,0x000000, 0x000000, 0xff6600, 0xff6600, 0xff6600, 0x000000, 0x000000, 0xff0033, 0xff6600, 0xff6600, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0xff6600, 0xff6600, 0xff0033, 0x000000, 0x000000, 0xff6600, 0xff6600, 0xff6600, 0xff0033, 0x000000, 0x000000, 0x000000]
```

Punisher (32x32, unsnaked): 
```
["000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "ffffff", "ffffff", "000000", "000000", "ffffff", "ffffff", "000000", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "000000", "ffffff", "000000", "ffffff", "ffffff", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "000000", "ffffff", "000000", "000000", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "000000", "ffffff", "000000", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "000000", "ffffff", "000000", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "000000", "ffffff", "000000", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "000000", "ffffff", "000000", "ffffff", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "000000", "ffffff", "000000", "ffffff", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "000000", "ffffff", "000000", "000000", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "000000", "ffffff", "000000", "000000", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "ffffff", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000"]
```

Punisher (Color names, 32x32, unsnaked):
```
["black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "black", "white", "white", "white", "white", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "black", "white", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "black", "white", "white", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "black", "white", "white", "white", "white", "white", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "black", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "black", "black", "black", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "black", "black", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white", "black", "black", "black", "black", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "black", "black", "black", "black", "black", "black", "white", "white", "white", "white", "black", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "black", "black", "black", "black", "black", "black", "white", "white", "white", "black", "black", "black", "black", "black", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "white", "black", "white", "white", "white", "black", "black", "black", "white", "white", "black", "black", "white", "white", "black", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "black", "black", "black", "black", "white", "white", "black", "white", "black", "white", "white", "black", "black", "black", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "white", "white", "white", "white", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "black", "white", "black", "black", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "black", "white", "black", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "black", "white", "black", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "black", "white", "black", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "black", "white", "black", "white", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "black", "white", "black", "white", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "black", "white", "black", "black", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "black", "white", "black", "black", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "white", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black"]
```
