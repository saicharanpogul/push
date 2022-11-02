import {ScaledSheet} from 'react-native-size-matters';

import colors from '../../theme/colors';

export default ScaledSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  column: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '16@s',
    alignItems: 'flex-start',
    marginBottom: '10@s',
  },
  title: {
    color: colors.tertiary.main,
    fontSize: '15@s',
    fontWeight: '600',
    marginTop: '4@s',
    marginBottom: '4@s',
  },
  subTitle: {
    color: colors.tertiary.light,
    fontSize: '12@s',
    fontWeight: '500',
    marginTop: '2@s',
    marginBottom: '8@s',
  },
  displayOption: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '2@s',
    backgroundColor: colors.background.main,
    width: '80@s',
    borderRadius: '12@s',
  },
  icon: {
    margin: '8@s',
    width: '20@s',
    height: '20@s',
  },
});
