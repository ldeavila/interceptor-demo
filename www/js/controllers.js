angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope) {
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    //$scope.chats = Chats.all();

    Chats.load().success(onSuccess);
    $scope.remove = function (chat) {
      Chats.remove(chat);
    }

    function onSuccess(data) {
      $scope.chats = data;
    }
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('BadChatsCtrl', function ($scope, Chats) {
    //$scope.chats = Chats.all();

    Chats.badLoad().success(onSuccess);
    $scope.remove = function (chat) {
      Chats.remove(chat);
    }

    function onSuccess(data) {
      $scope.chats = data;
    }
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
