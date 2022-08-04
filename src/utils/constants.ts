import {Dimensions} from 'react-native';

export const useConstants = () => {
  const dim = Dimensions.get('screen');

  return {
    dim,
    links: {
      github: 'https://github.com/kanzitelli/expo-starter',
      website: 'https://github.com/kanzitelli/expo-starter',
    },
    stripe: {
      publishableKey:
        'pk_test_51LRoVuLO6lN63ABDV4BTwHxD9mtwrE7qkv7VZ42WG3FQN7sW5NEHaOAeaSY7CDmB7WrHQAsBUkx0A44gfQubCFwP00MlRPzXWI',
    },
  };
};
