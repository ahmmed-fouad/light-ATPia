import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, G, Text as SVGText } from 'react-native-svg';

interface SatisfactionChartProps {
  satisfactionData: { name: string; value: number }[];
  starColors: string[];
}

const SatisfactionChart: React.FC<SatisfactionChartProps> = ({ satisfactionData, starColors }) => {
  const total = satisfactionData.reduce((sum, d) => sum + d.value, 0);
  const radius = 60;
  const centerX = 80;
  const centerY = 80;

  const createPieSlices = () => {
    let currentAngle = 0;
    return satisfactionData.map((item, idx) => {
      const percentage = item.value / total;
      const angle = percentage * 2 * Math.PI;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);

      const largeArcFlag = angle > Math.PI ? 1 : 0;

      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');

      return {
        path: pathData,
        color: starColors[idx % starColors.length],
        percentage,
        label: item.name,
        centerAngle: startAngle + angle / 2,
      };
    });
  };

  const slices = createPieSlices();

  return (
    <View style={{ alignItems: 'center', marginVertical: 12 }}>
      <Svg height="160" width="160">
        {slices.map((slice, idx) => (
          <G key={idx}>
            <Path
              d={slice.path}
              fill={slice.color}
              stroke="white"
              strokeWidth="2"
            />
            {slice.percentage > 0.05 && (
              <SVGText
                x={centerX + (radius * 0.7) * Math.cos(slice.centerAngle)}
                y={centerY + (radius * 0.7) * Math.sin(slice.centerAngle)}
                fill="white"
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {Math.round(slice.percentage * 100)}%
              </SVGText>
            )}
          </G>
        ))}
      </Svg>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, justifyContent: 'center' }}>
        {satisfactionData.map((item, idx) => (
          <View key={item.name} style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 6, marginVertical: 2 }}>
            <View style={{ width: 12, height: 12, backgroundColor: starColors[idx % starColors.length], borderRadius: 6, marginRight: 4 }} />
            <Text style={{ fontSize: 12 }}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SatisfactionChart; 