import {ScaledSheet} from 'react-native-size-matters';

import colors from '../../theme/colors';

export default ScaledSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  noBookmarks: {
    color: colors.tertiary.main,
    fontSize: '15@s',
    fontWeight: '600',
    marginTop: '4@s',
    marginBottom: '4@s',
  },
  column: {
    flexDirection: 'row',
  },
});
