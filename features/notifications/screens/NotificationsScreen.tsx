import { View, StyleSheet } from 'react-native';
import NotificationsHeader from '../components/NotificationsHeader';
import NotificationsTabs from '../components/NotificationsTabs';
import NotificationsBulkActions from '../components/NotificationsBulkActions';
import NotificationsList from '../components/NotificationsList';

const NotificationsScreen = () => {
  // Compose the header for the FlatList
  const listHeader = (
    <View style={styles.headerContainer}>
      <NotificationsHeader />
      <View style={styles.section}>
        <NotificationsTabs />
      </View>
      <View style={styles.section}>
        <NotificationsBulkActions />
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      <NotificationsList ListHeaderComponent={listHeader} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingTop: 88,
    paddingBottom: 0,
  },
  headerContainer: {
    // paddingHorizontal: 16, // already handled by root
  },
  section: {
    marginTop: 16,
    marginBottom: 4,
  },
});

export default NotificationsScreen; 