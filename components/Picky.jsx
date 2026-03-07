import { useState } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const Picky = ({ name, values, cVal, onChange, dStyles }) => {
  const [countryData, setCountryData] = useState([]);
  const [country, setCountry] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    // <View style={styles.container}>
    //   <View style={{ backgroundColor: '#fff', padding: 2, borderRadius: 15 }}>
        <Dropdown
          style={[dStyles, isFocus && { borderColor: '#990' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={values}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? `Select ${name}` : '...'}
          searchPlaceholder="Search..."
          value={cVal}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => onChange(item.value)}
        />
    //   </View>
    // </View>
  );
};

export default Picky;

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});