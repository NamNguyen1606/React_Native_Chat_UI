import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import {hs, vs, ms} from '../../utils/scaling';

export const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: vs(60),
    borderBottomWidth: 0.8,
    borderBottomColor: '#C7C7C7',
    paddingHorizontal: hs(15),
  },
  subHeader: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  headerInfoHolder: {
    width: hs(230),
    paddingLeft: hs(15),
    justifyContent: 'center',
  },
  statusInfoHolder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconHolder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  middle: {
    flex: 1,
  },
  bottom: {
    maxHeight: vs(150),
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: hs(5),
    paddingBottom: hs(10),
    borderTopWidth: 0.5,
    borderTopColor: '#C7C7C7',
  },
  footerWhiteSpace: {
    height: vs(20),
  },
  headerWhiteSpace: {
    height: vs(10),
  },
  activePoint: {
    height: hs(11),
    width: hs(11),
    borderRadius: hs(6),
    borderColor: 'white',
    borderWidth: 1,
  },
  txtReceiverName: {
    fontSize: ms(16),
    fontWeight: '700',
  },
  txtLastTimeActive: {
    fontSize: ms(11),
    marginLeft: hs(5),
    color: Colors.subText,
  },
  circle: {
    height: hs(30),
    width: hs(30),
    borderRadius: hs(15),
    backgroundColor: '#049FE3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hs(8),
  },
  inputHolder: {
    flexDirection: 'row',
    width: hs(250),
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderRadius: hs(20),
    marginLeft: hs(7),
    paddingLeft: hs(10),
    paddingRight: hs(5),
    marginTop: hs(5),
  },
  inputMessage: {
    maxWidth: hs(210),
  },
  iconFace: {
    marginBottom: hs(12),
  },
  bottomIconFunctionHolder: {
    width: hs(60),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sentIcon: {
    marginLeft: hs(3),
  },
  flatList: {paddingHorizontal: hs(10)},
});
