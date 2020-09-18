<template>
  <div class="container-main">
    <div class="locale-changer" v-if="viewlang">
      <span @click="langChange('en')" :class="{'selected': $i18n.locale==='en'}">En</span> | 
      <span @click="langChange('it')" :class="{'selected': $i18n.locale==='it'}">It</span>
    </div>
    <div class="row">
      <div class="col-md">
        {{ $t('set') }}
      </div>
      <div class="col-md">
        <div class="row">
          <div class="col-sm">
            <input type="checkbox" class="form-check-input" name="upper" id="upper" v-model="upper" @change="resetPasswd">&nbsp;
            <label class="form-check-label" for="upper">A-Z</label>
          </div>
          <div class="col-sm">
            <input type="checkbox" class="form-check-input" name="lower" id="lower" v-model="lower" @change="resetPasswd">&nbsp;
            <label class=" form-check-label" for="lower">a-z</label>
          </div>
          <div class="col-sm">
            <input type="checkbox" class="form-check-input" name="number" id="number" v-model="number" @change="resetPasswd">&nbsp;
            <label class=" form-check-label" for="number">0-9</label>
          </div>
          <div class="col-sm">
            <input type="checkbox" class="form-check-input" name="symbol" id="symbol" v-model="symbol" @change="resetPasswd">&nbsp;
            <label class=" form-check-label" for="symbol">@/,[]</label>
          </div>
        </div>
      </div>
    </div><!-- row -->
    <div class="row  mt-2">
      <div class="col">
        <label for="passwdLen" class="form-label">{{ $t('lenght') }} {{passwdLen}} &nbsp; {{ $t('lenght2') }}</label>
        <input type="range" class="form-range" id="passwdLen" min=4 max=48 v-model="passwdLen" @change="resetPasswd">
      </div>
    </div><!-- row -->

    <div class="row mt-4">
      <div class="col">
        <div class="input-group input-group-lg flex-nowrap">
          <input :type="view" id="passwd" class="form-control" :placeholder="[[$t('new')]]" aria-label="passwd" aria-describedby="view-passwd" readonly v-model="passwd">
          <span class="input-group-text" id="view-passwd" @click="toggleView">
            <svg v-if="view == 'text'" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye-fill" fill="#6c757f" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg>
            <svg v-if="view == 'password'" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-eye-slash-fill" fill="#6c757f" xmlns="http://www.w3.org/2000/svg"><path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/><path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z"/><path fill-rule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"/></svg>
          </span>
        </div>
      </div>
    </div><!-- row -->
    <div class="row">
      <div class="col-md mt-2">
        <button type="button" class="btn btn-primary btn-lg w-100" :class="{'disabled': !okcreate}" @click.stop.prevent="createPasswd">{{ $t('generate') }}</button>
      </div>
      <div class="col-md mt-2">
        <button type="button" class="btn btn-secondary btn-lg w-100" :class="{'disabled':!okcopy}" @click.stop.prevent="copyToClipBrd">
          <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-clipboard" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path fill-rule="evenodd" d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg> 
          {{$t('copy')}}
        </button>
      </div>
    </div> <!-- row -->

    <div class="row mt-2">
      <div class="col">
        <div class="alert alert-success" role="alert" v-if="okcopied == 1">
        {{message_copied}}
        </div>
        <div class="alert alert-danger" role="alert" v-if="okcopied == 2">
        {{message_copied}}
        </div>
      </div>
    </div> <!-- row -->


    
  </div> <!-- container -->
</template>

<script>
export default {
  name: 'PWGen',
  data() {
    return {
      view: "password",
      upper: true,
      lower: true,
      number: true,
      symbol: true,
      okcopy: false,
      okcopied: 0,
      message_copied: '',
      passwdLen: 12,
      passwd:'',
      viewlang: true
    }
  },
  computed: {
    okcreate:function() {
      var out = this.upper || this.lower || this.number || this.symbol;
      return out;
    }
  },
  created: function() {
    var cc = this.getCookie("pll_language");
    if (cc != "") {
      this.viewlang=false;
      this.$i18n.locale=cc;
    }
  },
  methods: {
    toggleView() {
      if (this.view === 'password') {
        this.view = 'text';
      } else {
        this.view = 'password';
      }
    }, 
    resetPasswd() {
      this.passwd='';
      this.okcopy=false;
      this.okcopied=0;
    },
    createPasswd() {
      var chars="";
      if (this.upper) {
        chars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
      if (this.lower) {
        chars+="abcdefghijklmnopqrtuvwxyz";
      }
      if (this.number) {
        chars+="0123456789";
      }
      if (this.symbol) {
        chars+="!@#$%^&*()_?><:{}[]";
      }
      var passwd="";
      for (var i=0; i<this.passwdLen; i++) {
        var rn = Math.floor(Math.random() * chars.length);
        passwd+=chars.substring(rn, rn+1);
      }
      this.passwd=passwd;
      this.okcopy = true;
    },
    copyToClipBrd() {
      var copyText = document.getElementById  ("passwd");
      copyText.setAttribute('type', 'text');
      copyText.select(); /*select the text*/
      copyText.setSelectionRange(0,99999); /*for mobile dev*/ 
      try {
        var s = document.execCommand("copy");
        if (s) {
          this.okcopied=1;
          this.message_copied=this.$t('copied');
        }
      }
      catch (err) {
        // alert("Opops, unable to copy")
        this.okcopied=2;
        this.message_copied=this.$t('error');
        // this.message_copied="Error ...";
      }
      copyText.setAttribute('type', this.view);
      window.getSelection().removeAllRanges()
    },
    langChange(l) {
      this.$i18n.locale=l;
    },
    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  }
}

</script>

<style>
.passwd > div {
  margin-top: 30px;
}
#view-passwd {
  cursor: pointer;
}
.container-main {
  margin: 1px;
  padding: 10px;
  border: 1px solid #252525;
}
.btn {
  font-size:1em !important;
}
.btn-group-lg>.btn, .btn-lg, 
.input-group-lg>.form-control,
.input-group-lg>.input-group-text {
  font-size: 1.25em !important;
}
.locale-changer {
  color: #888;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}
.selected {
  color: #222;
}
</style>