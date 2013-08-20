require([
  "jquery",
  "models/Repo",
  "mockjax"
], function($, Repo, Mockjax) {

  describe("Repo model validate usernames", function() {
    var repo,
      username = "mresposito"
      reposUrl = "/a/fake/url"

    beforeEach(function() {

      repo = new Repo({});
      // /* spyOn($, "ajax") */

      // $.mockjax({
      //   url: repo.userUrl(username),
      //   dataType: 'json',
      //   type: "get",
      //   responseTime: 20,
      //   responseText: {
      //     success: true,
      //     repos: reposUrl
      //   }
      // })
    })

    it("should be valid", function() {
      var callback = jasmine.createSpy();
      repo.setUsername(username, callback)

      waitsFor(function (argument) {
        return callback.callCount > 0
      })

      runs(function () {
        expect(callback).toHaveBeenCalled()
      })
    });

    it("should be invalid", function() {
      repo.setUsername("iBelieveThisUsernameDoesNotExist", function(isValid) {
        expect(isValid).toBe(false);
      })
    });

    it("should try to find other repos", function() {
      repo.setUsername(username, function(isValid) {
        expect(repo.loadRepoNamesFormUsers).toHaveBeenCalled();
      })
    });

    it("should save the username", function() {
      repo.setUsername(username, function(isValid) {
        expect(repo.username).toBe(username);
      })
    });
  });
});
